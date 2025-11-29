import urllib.request
import urllib.error
import os
import json

def get_url_and_save(url, filename="response.txt"):
    """
    Issues a GET request to the specified URL and saves the response as a text file
    using only Python's standard library.
    
    Args:
        url (str): The URL to send the GET request to
        filename (str, optional): The name of the file to save the response to. 
                                  Defaults to "response.txt".
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Send GET request using urllib
        with urllib.request.urlopen(url) as response:
            # Read the response data
            data = response.read().decode('utf-8')

            parsed_json = json.loads(data)
            parsed_json['request'] = None

            # Assuming each item has 'date' and 'name' fields
            parsed_json["response"]["data"].sort(key=lambda x: (x.get('period'), x.get('fueltypeid')))

            # Save the response content to a file
            with open(filename, 'w', encoding='utf-8') as file:
                file.write("const rawData = " + json.dumps(parsed_json, indent=4) + ";")
            
            
            print(f"Response successfully saved to {filename}")
            return True
    
    except urllib.error.URLError as e:
        print(f"Error making request: {e}")
        return False
    except IOError as e:
        print(f"Error saving file: {e}")
        return False

# Example usage
if __name__ == "__main__":

    apiKey = os.environ.get('EIA_API_KEY')
    eiaURL = "https://api.eia.gov/v2/electricity/electric-power-operational-data/data/?frequency=monthly&data[0]=generation&facets[fueltypeid][]=COW&facets[fueltypeid][]=HYC&facets[fueltypeid][]=NGO&facets[fueltypeid][]=NUC&facets[fueltypeid][]=TSN&facets[fueltypeid][]=WND&facets[location][]=US&facets[sectorid][]=99&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + apiKey

    get_url_and_save(eiaURL, "data.ts")