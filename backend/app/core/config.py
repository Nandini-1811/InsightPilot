from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    APP_NAME = os.getenv("APP_NAME","InsightPilot API")
    APP_VERSION = os.getenv("APP_VERSION","1.0.0")


settings = Settings()