import requests

# Set the URL for the find_sections endpoint
url = "http://localhost:5000/find-sections"

# Set the file path and search terms for the request
file_path = "/Users/samsam/Desktop/EXAMPLE.txt"
search_terms = ["CARTESIAN COORDINATES (A.U.)", "INTERNAL COORDINATES (ANGSTROEM)", "BASIS SET INFORMATION"]

# Create the request JSON
request_data = {
    "file_path": file_path,
    "search_terms": search_terms
}

# Send the request to the endpoint
response = requests.post(url, json=request_data)

# Check the response status code
if response.status_code == 200:
    print("Request successful.")
else:
    print(f"Request failed with status code {response.status_code}.")

