import json
import os

# Create directories to store the JSON and TXT files
json_dir = 'json_files'
txt_dir = 'txt_files'
os.makedirs(json_dir, exist_ok=True)
os.makedirs(txt_dir, exist_ok=True)

# Function to generate JSON content
def generate_json_content(index):
    return {
        "name": f"Using fixtures to represent data {index}",
        "email": f"test_{index}@cypress.io",
        "body": "Fixtures are a great way to mock data for responses to routes"
    }

# Generate 1000 JSON files
for i in range(1, 11):
    json_file_path = os.path.join(json_dir, f'file_{i}.json')
    with open(json_file_path, 'w') as json_file:
        json.dump(generate_json_content(i), json_file, indent=4)

print("10 JSON files have been generated.")

# Function to convert JSON file to single-line TXT file
def convert_json_to_txt(json_file_path, txt_file_path):
    with open(json_file_path, 'r') as json_file:
        json_content = json.load(json_file)
    json_string = json.dumps(json_content)
    spaced_json_string = json_string[:1] + " " + json_string[1:]
    n = len(spaced_json_string)
    spaced_json_string = spaced_json_string[:n-1] + " " + spaced_json_string[n-1:]
    with open(txt_file_path, 'w') as output_file:
        output_file.write(spaced_json_string)

# Convert each JSON file to a single-line TXT file
for i in range(1, 11):
    json_file_path = os.path.join(json_dir, f'file_{i}.json')
    txt_file_path = os.path.join(txt_dir, f'file_{i}.txt')
    convert_json_to_txt(json_file_path, txt_file_path)

print("All JSON files have been converted to single-line TXT files.")
