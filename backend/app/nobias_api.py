from fastapi import FastAPI, File, HTTPException
from pydantic import BaseModel
from .nobias_functions import *
from .political import *
from .positivenegative import *
from .linkreader import *
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)

origins = [
    "http://localhost:5173",  # Replace with the URL of your React app
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

class TextRequest(BaseModel):
    text: str
    link: str

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
    if not request.link:
        text = request.text
    if not request.text:
        text = extract_main_article(request.link)

    text = text.replace('\n', ' ')

    print("\n\nGENEARTING TITLE AND SUMMARY\n\n")
    resp1 = generate_info(text)
    print(resp1)
    # strings

    title = resp1["title"]
    summary = resp1["summary"]

    print("\n\nGENERATING SCORE\n\n")
    # int 0 - 50 based on neutrality, 
    # political un-bias, context, objectivness
    score = generate_score(text)

    print("\n\nGENERATING EMOTIONAL DATA\n\n")
    # arr [{emotion: score}, {emotion: score}]
    emotionalData = generate_emotions(text)

    # string, analysis
    print("\n\nGENERATING ANALYSIS")
    in_depth_analysis = generate_in_depth_analysis(text)

    # -100 to 100 poltical score
    print("GENERATING POLITCAL DATA")
    political = politicalAffiliation(text)
    politicalScore = political[0]
    politicalDetails = political[1]

    print("GENERATING POSITIVE AND NEGATIVE DATA")
    posneg = positiveNegative(text)
    posnegVal = posneg[1]
    posnegDetails = posneg[0]

    print("GENERATING 3 PERSPECTIVE ARTICLES")
    posArticle = generate_positive_article(text)
    negArticle = generate_negative_article(text)
    neutralArticle = generate_neutral_article(text)

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
            "perspectives1": {
                "positive": posArticle,
                "negative": negArticle,
                "neutral": neutralArticle
            },
            "perspectives": [
                {
                    "type": 'positive',
                    "text": posArticle["text"],
                    "title": posArticle["title"]
                },
                {
                    "type": 'negative',
                    "text": negArticle["text"],
                    "title": negArticle["title"]
                },
                {
                    "type": 'neutral',
                    "text": neutralArticle["text"],
                    "title": neutralArticle["title"]
                }
            ]}
