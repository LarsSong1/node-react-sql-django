from pymongo import MongoClient
from urllib.parse import quote_plus
import environ
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

password = quote_plus(env('MONGODB_PASSWORD'))
username = env('MONGODB_USERNAME')
mongo_uri = f"mongodb+srv://{username}:{password}@apps.vbmvuwy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(mongo_uri)

try:
    client.admin.command('ping')
    print("Conectado exitosamente a MongoDB")
except Exception as e:
    print(f"Error conectando a MongoDB: {e}")
