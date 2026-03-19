from django.db import models

class BronzeData(models.Model):
    stock_name = models.CharField(max_length=50)
    headline = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    source = models.CharField(max_length=100, null=True, blank=True)
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.stock_name} - {self.headline[:50]}"

class SilverData(models.Model):
    bronze_record = models.OneToOneField(BronzeData, on_delete=models.CASCADE, related_name='silver_data')
    clean_text = models.TextField()
    raw_sentiment_score = models.FloatField(null=True, blank=True)
    raw_sentiment_label = models.CharField(max_length=50, null=True, blank=True)
    normalized_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Silver: {self.bronze_record.stock_name} ({self.normalized_score})"

class GoldData(models.Model):
    stock_name = models.CharField(max_length=50)
    date = models.DateField()
    avg_sentiment = models.FloatField()
    daily_trend = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('stock_name', 'date')

    def __str__(self):
        return f"Gold: {self.stock_name} on {self.date} - {self.daily_trend}"
