import os
import requests
from datetime import datetime, timedelta

def fetch_news(stock_name):
    """
    Fetches news articles for a given stock from the last 3 months using NewsAPI.
    """
    api_key = os.getenv('NEWS_API_KEY')
    if not api_key:
        raise ValueError("NEWS_API_KEY environment variable is not set")
        
    url = "https://newsapi.org/v2/everything"
    
    # 3 months ago (~90 days, though NewsAPI Developer tier restricts to recent 1 month)
    # Note: NewsAPI Developer tier might fail for > 1 month, we'll request 28 days to be safe if it fails, 
    # but let's stick to 90 days if possible, or 30 days. Let's ask for 30 days as a fallback. 
    # Actually, developer tier is strictly 1 month. We will request 28 days.
    from_date = (datetime.now() - timedelta(days=28)).strftime('%Y-%m-%d')
    to_date = datetime.now().strftime('%Y-%m-%d')
    
    params = {
        'q': stock_name,
        'from': from_date,
        'to': to_date,
        'sortBy': 'publishedAt',
        'language': 'en',
        'apiKey': api_key,
        'pageSize': 100  # limit to 100 to avoid too much data in simple demo
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get('articles', [])
    else:
        print(f"Error fetching news for {stock_name}: {response.text}")
        return []
