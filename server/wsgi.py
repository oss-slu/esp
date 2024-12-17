"""
Initializes the Flask application and CORS configuration
based on FLASK_CONFIG.
"""
import os
from flask_cors import CORS
from application.app import create_app

FLASK_CONFIG = os.environ.get("FLASK_CONFIG", "development").lower()

app = create_app(FLASK_CONFIG)

if FLASK_CONFIG == "development":
    CLIENT_URLS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    cors = CORS(app, resources={r"*": {"origins": CLIENT_URLS}})
    print("CORS configured for development")

elif FLASK_CONFIG == "production":
    CLIENT_URLS = [
        "http://localhost:5001",
        "http://127.0.0.1:5001"
    ]
    cors = CORS(app, resources={r"*": {"origins": CLIENT_URLS}})
    print("CORS configured for production")

else:
    cors = CORS(app)
    print(f"Warning: Unknown FLASK_CONFIG '{FLASK_CONFIG}', default CORS applied.")
