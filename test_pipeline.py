import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sentiment_backend.settings')
django.setup()

from rest_framework.test import APIRequestFactory
from api.views import analyze_stock, get_analysis

def run_test():
    print("Testing pipeline for AAPL...")
    factory = APIRequestFactory()
    
    # Test POST
    print("Sending POST /api/analyze-stock with {'stock_name': 'AAPL'}")
    request = factory.post('/api/analyze-stock', {'stock_name': 'AAPL'}, format='json')
    response = analyze_stock(request)
    print(f"POST Response: {response.status_code}")
    print(response.data)
    
    print("-" * 50)
    
    # Test GET
    print("Sending GET /api/get-analysis/AAPL")
    request_get = factory.get('/api/get-analysis/AAPL')
    response_get = get_analysis(request_get, stock_name='AAPL')
    print(f"GET Response: {response_get.status_code}")
    print(response_get.data)

if __name__ == '__main__':
    run_test()
