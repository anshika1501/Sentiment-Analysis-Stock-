from django.urls import path
from . import views

urlpatterns = [
    path('analyze-stock', views.analyze_stock, name='analyze_stock'),
    path('get-analysis/<str:stock_name>', views.get_analysis, name='get_analysis'),
]
