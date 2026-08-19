import os

class Settings:
    APP_NAME: str = "BlueHub Backend API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./bluehub.db")
    AGENT_WEBSOCKET_URL: str = "ws://localhost:8765"
    CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000", "*"]

settings = Settings()
