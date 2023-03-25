import json
import string

def process_string(s):
    # Convert to title case
    s = s.title()
    # Remove punctuation
    s = s.translate(str.maketrans('', '', string.punctuation))
    # Remove leading and trailing spaces
    s = s.strip()
    # Return processed string
    return s


with open("gpt3-tag-matching/data.json", "r") as f:
    orgs = json.load(f)

tags_set = {}

# Counting unique tags and applying some standard formatting to them
print("Counting unique tags and applying standardized formatting...")
for org in orgs:

    nlp_tags = org['nlp_tags']

    for tag in nlp_tags:
        refined_tag = process_string(tag)
        
        if (refined_tag not in tags_set):
            tags_set[refined_tag] = 1
        else:
            tags_set[refined_tag] += 1


print("There are {} unique tags".format(len(tags_set)))

# Counting the number of tags that appear at least 3 times
count_at_least_3 = 0
for tag in tags_set:
    if tags_set[tag] > 2:
        count_at_least_3 += 1
print("There are {} tags that appear at least 3 times".format(count_at_least_3))


# Only keeping those tags whose count is at least 3
print("Only keeping tags that appear at least 3 times")
for org in orgs:

    nlp_tags = org['nlp_tags']
    refined_nlp_tags = []

    for tag in nlp_tags:
        refined_tag = process_string(tag)
        if (tags_set[refined_tag] > 3):
            refined_nlp_tags.append(refined_tag)

    org['nlp_tags'] = refined_nlp_tags

with open("gpt3-tag-matching/refined_data.json", "w") as f:
    json.dump(orgs, f, indent=4)

# Dealing with orgs that have no tags associated with them
print("Dealing with orgs that have no tags associated with them")
print("Fix manually:")
for org in orgs:

    nlp_tags = org['nlp_tags']
    refined_nlp_tags = []

    for tag in nlp_tags:
        refined_tag = process_string(tag)
        if (tags_set[refined_tag] > 3):
            refined_nlp_tags.append(refined_tag)
    
    if (len(refined_nlp_tags) == 0):
        refined_nlp_tag = org['tags']
    
    if (len(org['tags']) == 0 and len(org['nlp_tags']) == 0):
        print(org['name'])

    org['nlp_tags'] = refined_nlp_tags

# Merging tags
for org in orgs:
    resulting_list = list(org['tags'])
    resulting_list.extend(x for x in org['nlp_tags'] if x not in resulting_list)
    org['final_tags'] = resulting_list

with open("gpt3-tag-matching/refined_data.json", "w") as f:
    json.dump(orgs, f, indent=4)