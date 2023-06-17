from fastapi import FastAPI
from .nobias_functions import (test_generation, generate_info)

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

