import os
import requests
import logging

logger = logging.getLogger(__name__)

HF_API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"

def get_sentiment(text):
    """
    Calls Hugging Face API (mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis)
    Returns a dict with 'label' and 'score'. 
    Labels are typically 'positive', 'neutral', 'negative'.
    """
    api_key = os.getenv('HF_API_KEY')
    if not api_key:
        logger.error("HF_API_KEY environment variable is not set")
        return None
        
    headers = {"Authorization": f"Bearer {api_key}"}
    
    # Truncate text to avoid model length limits
    text = text[:1500] 

    payload = {"inputs": text}
    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0 and isinstance(result[0], list):
                # API returns a list of lists of dicts
                scores = result[0]
                best_match = max(scores, key=lambda x: x['score'])
                return {
                    'label': best_match['label'],
                    'score': best_match['score']
                }
            elif isinstance(result, list) and len(result) > 0 and isinstance(result[0], dict):
                # Fallback format
                best_match = max(result, key=lambda x: x['score'])
                return {
                    'label': best_match['label'],
                    'score': best_match['score']
                }
            else:
                logger.warning(f"Unexpected HF API response format: {result}")
                return None
        else:
            logger.error(f"Error from HF API: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"Exception calling HF API: {e}")
        return None

def normalize_score(label, score):
    """
    Normalizes the returned score strings and certainty score (0-1) into a 0-10 scale.
    """
    if not label:
        return 5.0 # neutral default
        
    label = label.lower()
    
    if label == 'positive':
        return 5.0 + (5.0 * score)
    elif label == 'negative':
        return 5.0 - (5.0 * score)
    else: # neutral
        # if score is high for neutral, we stay close to 5
        return 5.0
