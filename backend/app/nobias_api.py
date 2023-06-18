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
    request.text = request.text.replace('\n', ' ')
    json_resp = generate_info(request.text)
    return json_resp

@app.get("/generate_negative_article")
async def generate_negative_article_endpoint(request: TextRequest):
    request.text = request.text.replace('\n', ' ')
    json_resp = generate_negative_article(request.text)
    return json_resp

@app.get("/generate_neutral_article")
async def generate_neutral_article_endpoint(request: TextRequest):
    request.text = request.text.replace('\n', ' ')
    json_resp = generate_neutral_article(request.text)
    return json_resp

@app.get("/generate_positive_article")
async def generate_positive_article_endpoint(request: TextRequest):
    request.text = request.text.replace('\n', ' ')
    json_resp = generate_positive_article(request.text)
    return json_resp

@app.get("/generate_emotions")
async def generate_emotions_endpoint(request: TextRequest):
    request.text = request.text.replace('\n', ' ')
    resp = generate_emotions(request.text)
    return {"results": resp}

@app.post("/generate_props")
async def generate_props_endpoint(request: TextRequest):
    request.text = request.text.replace('\n', ' ')

    resp1 = generate_info(request.text)
    print(resp1)
    # strings
    title = resp1["title"]
    summary = resp1["summary"]

    # int 0 - 50 based on neutrality, 
    # political un-bias, context, objectivness
    score = generate_score(request.text)

    # arr [{emotion: score}, {emotion: score}]
    emotionalData = generate_emotions(request.text)

    # string, analysis
    in_depth_analysis = generate_in_depth_analysis(request.text)

    # -100 to 100 poltical score
    political = politicalAffiliation(request.text)
    politicalScore = political[0]
    politicalDetails = political[1]

    posneg = positiveNegative(request.text)
    posnegVal = posneg[0]
    posnegDetails = posneg[1]

    posArticle = generate_positive_article(request.text)
    negArticle = generate_negative_article(request.text)
    neutralArticle = generate_neutral_article(request.text)

    return {"score": score,
            "title": title,
            "summary": summary,
            "politicalAffiliation": {
                "details": politicalDetails,
                "val": politicalScore
                },
            "positiveVNegative": {
                "details": posnegVal,
                "val": posnegDetails
            },
            "emotionalData": emotionalData,
            "indepthAnalysis": in_depth_analysis,
            "perspectives": {
                "positive": posArticle,
                "negative": negArticle,
                "neutral": neutralArticle
            }}
