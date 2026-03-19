import re
import nltk
from nltk.corpus import stopwords
import logging

logger = logging.getLogger(__name__)

# Download stopwords if not already present
try:
    stopwords.words('english')
except LookupError:
    try:
        nltk.download('stopwords')
    except Exception as e:
        logger.error(f"Failed to download NLTK stopwords: {e}")

def clean_text(text):
    """
    Cleans text by removing HTML tags, special characters, and stopwords.
    """
    if not text:
        return ""
    
    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)
    
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Convert to lowercase
    text = text.lower()
    
    try:
        stop_words = set(stopwords.words('english'))
        words = text.split()
        cleaned_words = [w for w in words if w not in stop_words]
        return " ".join(cleaned_words)
    except Exception as e:
        logger.warning(f"Error filtering stopwords (fallback to basic clean): {e}")
        return text
