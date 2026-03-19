import logging
from datetime import datetime, date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BronzeData, SilverData, GoldData
from .services import news_service, processing_service, sentiment_service, aggregation_service
from django.db import transaction

logger = logging.getLogger(__name__)

@api_view(['POST'])
def analyze_stock(request):
    """
    POST /analyze-stock
    Input: {"stock_name": "AAPL"}
    """
    stock_name = request.data.get('stock_name')
    if not stock_name:
        return Response({"error": "stock_name is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    logger.info(f"Starting analysis for {stock_name}")
    
    try:
        # 1. Fetch news
        articles = news_service.fetch_news(stock_name)
        if not articles:
            return Response({"message": f"No news found for {stock_name} or error fetching news."}, status=status.HTTP_404_NOT_FOUND)
            
        logger.info(f"Fetched {len(articles)} articles for {stock_name}")
        
        saved_count = 0
        for article in articles:
            # 2. Store in BronzeData
            published_at_str = article.get('publishedAt')
            if not published_at_str:
                continue
                
            try:
                published_at_str = published_at_str.replace('Z', '+00:00')
                published_at = datetime.fromisoformat(published_at_str)
            except ValueError:
                continue

            headline = article.get('title')
            if not headline or BronzeData.objects.filter(stock_name__iexact=stock_name, headline=headline).exists():
                continue
                
            bronze_record = BronzeData.objects.create(
                stock_name=stock_name,
                headline=headline[:500],
                description=article.get('description', ''),
                source=article.get('source', {}).get('name', ''),
                published_at=published_at
            )
            
            # 3. Clean text
            text_to_clean = f"{bronze_record.headline} {bronze_record.description or ''}"
            clean_text = processing_service.clean_text(text_to_clean)
            
            # 4. Sentiment Analysis
            sentiment_result = sentiment_service.get_sentiment(clean_text)
            
            raw_label = None
            raw_score = None
            normalized = 5.0
            
            if sentiment_result:
                raw_label = sentiment_result.get('label')
                raw_score = sentiment_result.get('score')
                normalized = sentiment_service.normalize_score(raw_label, raw_score)
            
            # 5. Store in SilverData
            SilverData.objects.create(
                bronze_record=bronze_record,
                clean_text=clean_text,
                raw_sentiment_label=raw_label,
                raw_sentiment_score=raw_score,
                normalized_score=normalized
            )
            saved_count += 1
            
        # 6. Aggregate for today
        target_date = date.today()
        gold_record = aggregation_service.aggregate_sentiment(stock_name, target_date)
        
        response_data = {
            "message": "Analysis completed successfully",
            "stock_name": stock_name,
            "articles_processed": saved_count,
        }
        
        if gold_record:
            response_data["summary"] = {
                "date": gold_record.date,
                "avg_sentiment": gold_record.avg_sentiment,
                "daily_trend": gold_record.daily_trend
            }
            
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error during analysis: {str(e)}")
        return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_analysis(request, stock_name):
    """
    GET /get-analysis/<stock_name>
    """
    records = GoldData.objects.filter(stock_name__iexact=stock_name).order_by('-date')
    if not records.exists():
        return Response({"message": f"No analysis found for {stock_name}"}, status=status.HTTP_404_NOT_FOUND)
        
    data = [
        {
            "date": record.date,
            "avg_sentiment": record.avg_sentiment,
            "daily_trend": record.daily_trend
        }
        for record in records
    ]
    
    return Response({
        "stock_name": stock_name,
        "history": data
    }, status=status.HTTP_200_OK)
