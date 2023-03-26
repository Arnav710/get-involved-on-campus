import json
import string

def process_string(s):
    # Convert to title case
    s = s.lower()
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

unique_tags = []
for tag in tags_set:
    if (tags_set[tag] > 3):
        unique_tags.append(tag)

with open("gpt3-tag-matching/unique_tags.json", "w") as f:
    json.dump(unique_tags, f, indent=4)

# Merging tags
for org in orgs:

    resulting_list = [x.lower() for x in org['tags']]

    predefined_categories = ["Cooperative", "Cultural",  "Dance",  
                        "Interfraternity Council (IFC)", 
                        "Martial Arts/Combatives/Weaponry", "Media", 
                        "Greek Fraternity", "Greek Sorority", "Music and Performance", 
                        "National Pan-Hellenic Council", "Panhellenic Association", "Political",  
                        "Spiritual", "Student Affirmative Actions Committee"]

    predefined_categories = [x.lower() for x in predefined_categories]

    special = False
    for special_tag in predefined_categories:
        if special_tag in resulting_list:
            org['final_tags'] = resulting_list
            special = True
            break

    if (not special):
        resulting_list.extend(x.lower() for x in org['nlp_tags'] if x not in resulting_list)
        org['final_tags'] = resulting_list

with open("gpt3-tag-matching/refined_data.json", "w") as f:
    json.dump(orgs, f, indent=4)


# Dealing with orgs that have no tags associated with them
print("Dealing with orgs that have no tags associated with them")
print("Fix manually:")
for org in orgs:

    if (len(org['final_tags']) == 0):
        print(org['name'])