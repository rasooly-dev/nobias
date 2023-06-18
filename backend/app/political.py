import openai
import json
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

def get_completion(prompt, model="gpt-4"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]

def politicalAffilitation(givenText):

    prompt = f"""
    You will be provided with text delimited by triple quotes. 

    analyze this text to determine if the political point of view is leftist or rightist \
    and rate on a spectrum from -100 to 100, where 100 is right, -100 is left, and 0 is neutral
    keeping in mind that if the text associates a negative perspective of the right or rightist politicians/parties, it is most likely leftist and 
    if the text associates a negative perspective of the left or leftist politicians/parties, it is most likely rightist  


    \"\"\"{givenText}\"\"\"
    """

    response = get_completion(prompt)
    print("Completion for Text 1:")
    print(response)

    return response
