"""
Installing dependencies:
pip3 install BeautifulSoup4
"""

import requests
from bs4 import BeautifulSoup
import json

taggedOrganizations = {}

def populateTaggedOrganizations():

    categoryToLinkMapping = {   

        "Cooperative": "https://studentorg.ucsd.edu/Home/Index/10",
        "Cultural": "https://studentorg.ucsd.edu/Home/Index/9",
        "Dance": "https://studentorg.ucsd.edu/Home/Index/26",
        "Educational": "https://studentorg.ucsd.edu/Home/Index/11",
        "Health Professions": "https://studentorg.ucsd.edu/Home/Index/13",
        "Interfraternity Council (IFC)": "https://studentorg.ucsd.edu/Home/Index/14",
        "Martial Arts/Combatives/Weaponry": "https://studentorg.ucsd.edu/Home/Index/24",
        "Media": "https://studentorg.ucsd.edu/Home/Index/15",
        "Greek Fraternity": "https://studentorg.ucsd.edu/Home/Index/12",
        "Greek Sorority":"https://studentorg.ucsd.edu/Home/Index/25",
        "Music and Performance": "https://studentorg.ucsd.edu/Home/Index/27",
        "National Pan-Hellenic Council": "https://studentorg.ucsd.edu/Home/Index/30",
        "Panhellenic Association": "https://studentorg.ucsd.edu/Home/Index/16",
        "Political": "https://studentorg.ucsd.edu/Home/Index/18",
        "Pre-professional": "https://studentorg.ucsd.edu/Home/Index/19",
        "Service and Changemaking": "https://studentorg.ucsd.edu/Home/Index/22",
        "Social": "https://studentorg.ucsd.edu/Home/Index/23",
        "Spiritual": "https://studentorg.ucsd.edu/Home/Index/21",
        "Student Affirmative Actions Committee": "https://studentorg.ucsd.edu/Home/Index/17"
    
    }

    for category in categoryToLinkMapping:

        categoryURL = categoryToLinkMapping[category]

        # Send a GET request to the URL to fetch the webpage content
        response = requests.get(categoryURL)

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all the <tr> elements in the HTML content
        orgs = soup.find_all('tr')

        # to skip the table header
        orgs = orgs[1:]

        # creating a list in dictionary
        taggedOrganizations[category] = []

        for org in orgs:

            # Find the <a> element inside the <td> element
            a_tag = org.find('a')

            # Extract the name of the organization and the href attribute
            name = a_tag.text.strip()

            taggedOrganizations[category].append(name)

def fetchStudentOrgDataIntoJSON(url):
    # Send a GET request to the URL to fetch the webpage content
    response = requests.get(url)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all the <tr> elements in the HTML content
    orgs = soup.find_all('tr')

    # to skip the table header
    orgs = orgs[1:]

    # List to store the extracted information
    org_list = []

    i = 0
    # Loop through all the <tr> elements
    for org in orgs:

        print(i)
        i += 1

        # Find the <a> element inside the <td> element
        a_tag = org.find('a')

        # Extract the name of the organization and the href attribute
        name = a_tag.text.strip()
        
        # forming the link to the page of the student org
        route = a_tag['href']
        studentOrgUrl = url + route

        org_dict = {'name': name, 'href': studentOrgUrl}

        org_list.append(org_dict)
    
        # Determining the associated tags
        tagsAssociatedWithStudentOrg = []
        for tag in taggedOrganizations:
            if (name in taggedOrganizations[tag]):
                tagsAssociatedWithStudentOrg.append(tag)

        # After this, we also want to add the description and contact email to the JSON
        orgInfoResponse = requests.get(studentOrgUrl)
        orgSoup = BeautifulSoup(orgInfoResponse.content, 'html.parser')
        orgDescription = orgSoup.find_all('dd')
        description = orgDescription[1].text.strip()
        org_dict['description'] = description
        org_dict['tags'] = tagsAssociatedWithStudentOrg


    # Write the extracted information to a JSON file
    with open('./web-scraping/orgs.json', 'w') as f:
        json.dump(org_list, f, indent=4)

# defining the url and invoking the function
url = 'https://studentorg.ucsd.edu/'
populateTaggedOrganizations()
print("The following are the tagged organizations", taggedOrganizations)
fetchStudentOrgDataIntoJSON(url)