import json

with open("data/content_metadata.json", "r") as file:
    data=json.load(file)

print(data[0])