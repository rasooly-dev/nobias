from fastapi import FastAPI
from .nobias_functions import *

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test")
async def test_generation_endpoint(prompt: str):
    resp = test_generation(prompt)
    return {"message": resp}

@app.get("/generate_info")
async def generate_info_endpoint(text: str):
    json_resp = generate_info(text)
    return json_resp

@app.get("/generate_negative_article")
async def generate_negative_article(text: str):
    json_resp = generate_negative_article(text)
    return json_resp

@app.get("/generate_neutral_article")
async def generate_neutral_article(text: str):
    json_resp = generate_neutral_article(text)
    return json_resp

@app.get("/generate_positive_article")
async def generate_positive_article(text: str):
    json_resp = generate_positive_article(text)
    return json_resp

@app.get("/generate_emotions")
async def generate_emotions_endpoint(text: str):
    resp = generate_emotions(text)
    return {"results": resp}