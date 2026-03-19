import logging
from django.db.models import Avg
from api.models import SilverData, GoldData
from datetime import date

logger = logging.getLogger(__name__)

def aggregate_sentiment(stock_name, target_date=None):
    """
    Calculates the average sentiment for a given stock on a specific date,
    determines the daily trend, and saves it to GoldData.
    """
    if not target_date:
        target_date = date.today()
        
    silver_records = SilverData.objects.filter(
        bronze_record__stock_name__iexact=stock_name
    )
    
    if not silver_records.exists():
        logger.info(f"No silver records found for {stock_name} on {target_date}")
        return None
        
    avg_score = silver_records.aggregate(Avg('normalized_score'))['normalized_score__avg']
    
    if avg_score is None:
        return None
        
    avg_score = round(avg_score, 2)
    
    # Determine daily trend
    if avg_score > 6.0:
        trend = "BULLISH"
    elif avg_score < 4.0:
        trend = "BEARISH"
    else:
        trend = "NEUTRAL"
        
    # Update or create GoldData
    gold_record, created = GoldData.objects.update_or_create(
        stock_name=stock_name.upper(),
        date=target_date,
        defaults={
            'avg_sentiment': avg_score,
            'daily_trend': trend
        }
    )
    
    logger.info(f"Aggregated sentiment for {stock_name} on {target_date}: {avg_score} ({trend})")
    
    return gold_record
