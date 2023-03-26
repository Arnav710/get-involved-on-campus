import json

with open("backend/data.json", "r") as f:
    orgs = json.load(f)

distinct_tags = []

for org in orgs:

    tags = org['final_tags']

    for tag in tags:
        if tag not in distinct_tags:
            distinct_tags.append(tag)
    