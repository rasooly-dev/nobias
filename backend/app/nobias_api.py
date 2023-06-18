from fastapi import FastAPI
from pydantic import BaseModel
from .nobias_functions import *
from .political import *
from .positivenegative import *

app = FastAPI()

class TextRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test")
async def test_generation_endpoint(prompt: str):
    resp = test_generation(prompt)
    return {"message": resp}

@app.get("/generate_info")
async def generate_info_endpoint(request: TextRequest):
    json_resp = generate_info(request.text)
    return json_resp

@app.get("/generate_negative_article")
async def generate_negative_article_endpoint(request: TextRequest):
    json_resp = generate_negative_article(request.text)
    return json_resp

@app.get("/generate_neutral_article")
async def generate_neutral_article_endpoint(request: TextRequest):
    json_resp = generate_neutral_article(request.text)
    return json_resp

@app.get("/generate_positive_article")
async def generate_positive_article_endpoint(request: TextRequest):
    json_resp = generate_positive_article(request.text)
    return json_resp

@app.get("/generate_emotions")
async def generate_emotions_endpoint(request: TextRequest):
    resp = generate_emotions(request.text)
    return {"results": resp}

@app.get("/generate_props")
async def generate_props_endpoint(text: str):
    return {"msg": 'hi'}
    resp1 = generate_info(text)
    
    # strings
    title = resp1[title]
    summary = resp1[summary]

    # int 0 - 50 based on neutrality, 
    # political un-bias, context, objectivness
    score = generate_score(text)

    # arr [{emotion: score}, {emotion: score}]
    emotionalData = generate_emotions(text)

    # string, analysis
    in_depth_analysis = generate_in_depth_analysis(text)

    # -100 to 100 poltical score
    politicalScore = politicalAffiliation(text)[0]

    return {"score": score,
            "title": title,
            "summary": summary,
            "politicalAffiliation": politicalScore,
            "emotionalData": emotionalData,
            "indepthAnalysis": in_depth_analysis}
