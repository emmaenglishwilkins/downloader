# bulk download urls without having rate limit issues 
import requests
import time
import os

with open('urls.txt', 'r') as file:
    urls = [line.strip() for line in file if line.strip()]

username = urls[0].split("/@")[1].split("/")[0]
directory = f"./{username}"
# Create directory if it doesn't exist
if not os.path.exists(directory):
    os.makedirs(directory)

count = 0
for url in urls:
    filename = os.path.join(directory, url.split("/")[-1])  # Save file in the new directory
    # Check if the file already exists
    if not os.path.exists(filename):  # Ensure the file doesn't exist before downloading
        response = requests.get(url)  # Move the request inside the condition
        with open(filename, "wb") as f:
            f.write(response.content)
            count += 1
    else:
        print(f"File {filename} already exists, skipping download.")
    # time.sleep(2)  # Adjust delay as needed

print(f"Downloaded {count} files.")
