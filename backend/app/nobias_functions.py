import openai
from dotenv import load_dotenv
import os
import json
import re
import requests

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = api_key
API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

headers = {
		"Content-Type": "application/json",
		"Authorization": f"Bearer {api_key}"
	}


def main():
	print("Hello World")
	print(test_generation("CalHacks"))


def test_generation(prompt: str):
	test_prompt = f"Write a sentence about {prompt}"

	

	data = {
		"model": "gpt-4",
		"messages": [
			{"role": "system", "content": "You are a helpful assistant."},
			{"role": "user", "content": test_prompt}
		],
		"max_tokens": 50
	}

	response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

	if response.status_code == 200:
		return response.json()["choices"][0]["message"]["content"]
	else:
		raise Exception(f"Error {response.status_code}: {response.text}")


def generate_info(text: str):
	prompt = f"Given a piece of text, please generate a concise and unbiased summary of the content." \
         f" Additionally, extract three statements from the text that can be fact-checked." \
         f" Please provide the response in JSON format." \
         f"\n\nExample response format:" \
         f"\n{{" \
         f"\n    \"summary\": \"This is a summary of the text.\"," \
         f"\n    \"facts\": [" \
         f"\n        \"Fact 1 statement.\"," \
         f"\n        \"Fact 2 statement.\"," \
         f"\n        \"Fact 3 statement.\"" \
         f"\n    ]" \
         f"\n}}" \
         f"\n\nHere is the text to summarize and extract facts from:\n{text}"
	
	data = {
		"model": "gpt-4",
		"messages": [
			{"role": "system", "content": "You are a helpful assistant."},
			{"role": "user", "content": prompt}
		],
		"max_tokens": 1000
	}

	response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

	if response.status_code == 200:
		resp = response.json()["choices"][0]["message"]["content"]
		json_resp = json.loads(resp)
		return json_resp
	else:
		raise Exception(f"Error {response.status_code}: {response.text}")

