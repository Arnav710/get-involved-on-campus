import json
import openai
import time

openai.api_key = "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"

def get_tags(description):
    prompt = (f"I have the following description about a student organization (Ignore UCSD from the description):\n{description}\n\nBased on the description, pick the at most top 3 tags from the following list ['Environmental Science','Agriculture','Sustainability','Biology','Chemistry','Earth Science','Computer Science','Art','History','Finance','Sports','Spiritual','Service and Changemaking','Cultural','Dance','Health Professions','Social','Music','Math','Economics','Political Science','Language','Business and Management','Psychology','Engineering']. If less than 3 tags apply, you can select less than 3 as well, just be accurate. Also, only assign fields of study to descriptions that seem educational. Give me a comma separated list of tags only from the ones I provided earlier. Do not create new ones.")
    response = openai.Completion.create(engine="text-davinci-002", prompt=prompt, max_tokens=50, n=1,stop=None,temperature=0.7)
    tags = response.choices[0].text.strip().split(", ")
    return tags

with open("gpt3-tag-matching/data.json", "r") as f:
    student_orgs = json.load(f)

count = 0

for org in student_orgs:

    

    if (count % 5 == 0):
        print(count)
        with open("gpt3-tag-matching/data.json", "w") as f:
            json.dump(student_orgs, f, indent=4)

    count += 1

    if ("nlp_tags" in org.keys()):
        continue

    

    if (count % 80 == 0):
        print("Waiting for 60s")
        time.sleep(60)

    tags = get_tags(org["description"])
    org["nlp_tags"] = tags