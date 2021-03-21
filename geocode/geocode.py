"""
Python script for batch geocoding of addresses using the Google Geocoding API.
This script allows for massive lists of addresses to be geocoded for free by pausing when the 
geocoder hits the free rate limit set by Google (2500 per day).  If you have an API key for paid
geocoding from Google, set it in the API key section.
Addresses for geocoding can be specified in a list of strings "addresses". In this script, addresses
come from a csv file with a column "Address". Adjust the code to your own requirements as needed.
After every 500 successful geocode operations, a temporary file with results is recorded in case of 
script failure / loss of connection later.
Addresses and data are held in memory, so this script may need to be adjusted to process files line
by line if you are processing millions of entries.
Shane Lynn
5th November 2016
"""

"""
The script has been adjusted for processing entries.csv, querying Google Geocoding API
for entries marked as 'approved' with preference to Greece, 
and outputing results in a csv and a geojson for use in the Leaflet map.
It can be run after the generator script.
In CONFIGURATION you can set you Google API key, input/output filepaths, 
relevant column names, filters for the original entries csv (eg approved),
and region preference for geocoding.

NL 3/2021
"""

import pandas as pd
import requests
import logging
import time

import geojson

logger = logging.getLogger("root")
logger.setLevel(logging.DEBUG)
# create console handler
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
logger.addHandler(ch)

#------------------ CONFIGURATION -------------------------------

# Set your Google Geocoding API key here (you have to ENABLE it from dev dashboard) https://console.developers.google.com/apis/
# Example: API_KEY = 'AIzaSyC9azed9tLdjpZNjg2_kVePWvMIBq154eA'
API_KEY = 'AIzaSyAOLJ8EKBZQWGDYD34iR1192kZ4U-_ifK8'
# Backoff time sets how many minutes to wait between google pings when your API limit is hit
BACKOFF_TIME = 30
# Set input directory
input_dir = ''
# Set your input file here
input_filename = "entries.csv"
# Set output directory
output_dir = 'geocode/'
# Set your output file name here.
output_filename = 'geocode_output.csv'
# Specify the column name in your input data that contains addresses here
address_column_name = "Πού συνέβη;"
# Specify the column name in your input data that contains unique id
id_column_name = "ID"
# Specify the column name in your input data that contains event description. This goes into geocode csv and map marker popups.
# Set None for no descriptions
description_column_name = "Σύντομη περιγραφή"
# Filter to specific rows
# Set None if no filters
FILTERS = [
    {
        'column': 'Εγκυρότητα',
        'value': 'approved'
    }
    # , More filters
    # {
    #     column: '...',
    #     value: '...'
    # }
]
# Region bias if you want API to prefer locations in a specific region. This parameter takes a ccTLD (country code top-level domain) 
# Use None if no bias preference
REGION = "gr"
# Return Full Google Results? If True, full JSON results from Google are included in output
RETURN_FULL_RESULTS = False

#------------------ DATA LOADING --------------------------------

# Read the data to a Pandas Dataframe
data = pd.read_csv(input_dir + input_filename, encoding='utf8')

if address_column_name not in data.columns:
	raise ValueError("Missing Address column in input data")

if id_column_name not in data.columns:
	raise ValueError("Missing unique ID column in input data")

if FILTERS:
    for filter in FILTERS:
        if filter['column'] not in data.columns:
            raise ValueError("Missing column " + filter['column'] + " in input data")
        data = data[data[filter['column']] == filter['value']]

# Form a list of addresses for geocoding:
# Make a big list of all of the addresses to be processed.
addresses = data[address_column_name].tolist()

# Form a list of ID for easy identification of original entries:
ids = data[id_column_name].tolist()

if description_column_name:
    descriptions = data[description_column_name].tolist()

#------------------	FUNCTION DEFINITIONS ------------------------

def get_google_results(unique_id, address, description=None, api_key=None, region=None, return_full_response=False):
    """
    Get geocode results from Google Maps Geocoding API.
    
    Note, that in the case of multiple google geocode reuslts, this function returns details of the FIRST result.
    
    @param address: String address as accurate as possible. For Example "18 Grafton Street, Dublin, Ireland"
    @param api_key: String API key if present from google. 
                    If supplied, requests will use your allowance from the Google API. If not, you
                    will be limited to the free usage of 2500 requests per day.
    @param return_full_response: Boolean to indicate if you'd like to return the full response from google. This
                    is useful if you'd like additional location details for storage or parsing later.
    """
    # Set up your Geocoding url
    geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}".format(address)

    if api_key is not None:
        geocode_url = geocode_url + "&key={}".format(api_key)

    if region is not None:
        geocode_url = geocode_url + "&region={}".format(region)
        
    # Ping google for the reuslts:
    results = requests.get(geocode_url)
    # Results will be in JSON format - convert to dict using requests functionality
    results = results.json()

    # print(results)
    
    # if there's no results or an error, return empty results.
    if len(results['results']) == 0:
        output = {
            "formatted_address" : None,
            "latitude": None,
            "longitude": None,
            "accuracy": None,
            "google_place_id": None,
            "type": None,
            "postcode": None
        }
    else:    
        answer = results['results'][0]
        output = {
            "formatted_address" : answer.get('formatted_address'),
            "latitude": answer.get('geometry').get('location').get('lat'),
            "longitude": answer.get('geometry').get('location').get('lng'),
            "accuracy": answer.get('geometry').get('location_type'),
            "google_place_id": answer.get("place_id"),
            "type": ",".join(answer.get('types')),
            "postcode": ",".join([x['long_name'] for x in answer.get('address_components') 
                                  if 'postal_code' in x.get('types')])
        }
        
    # Append some other details:    
    output['ID'] = unique_id
    if description: output['description'] = description
    output['input_string'] = address
    output['number_of_results'] = len(results['results'])
    output['status'] = results.get('status')
    if return_full_response is True:
        output['response'] = results
    
    return output

#------------------ PROCESSING LOOP -----------------------------

# Ensure, before we start, that the API key is ok/valid, and internet access is ok
# test_result = get_google_results("London, England", API_KEY, REGION, RETURN_FULL_RESULTS)
# if (test_result['status'] != 'OK') or (test_result['formatted_address'] != 'London, UK'):
    logger.warning("There was an error when testing the Google Geocoder")
    raise ConnectionError('Problem with test results from Google Geocode - check your API key and internet connection. Result: ' + str(test_result))

# Create a list to hold results
results = []
# Initialise geoJson features list
geojson_feature_list = []

# Go through each address in turn
for i, address in enumerate(addresses):
    unique_id = int(ids[i])
    description = descriptions[i] if descriptions else None
    # While the address geocoding is not finished:
    geocoded = False
    while geocoded is not True:
        # Geocode the address with google
        try:
            geocode_result = get_google_results(unique_id, address, description, API_KEY, REGION, return_full_response=RETURN_FULL_RESULTS)
        except Exception as e:
            logger.exception(e)
            logger.error("Major error with {}".format(address))
            logger.error("Skipping!")
            geocoded = True
            
        # If we're over the API limit, backoff for a while and try again later.
        if geocode_result['status'] == 'OVER_QUERY_LIMIT':
            logger.info("Hit Query Limit! Backing off for a bit.")
            time.sleep(BACKOFF_TIME * 60) # sleep for 30 minutes
            geocoded = False
        else:
            # If we're ok with API use, save the results
            
            logger.debug("Geocoded: {}: {}".format(address, geocode_result['status']))
            results.append(geocode_result)

            # Note that the results might be empty / non-ok - log this and do not include in geojson
            if geocode_result['status'] != 'OK':
                logger.warning("Error geocoding {}: {}".format(address, geocode_result['status']))
            else:
                geojson_point = geojson.Point((geocode_result['longitude'], geocode_result['latitude']))
                if (geocode_result['description']):
                    feature_properties = {
                        'description': geocode_result['description']
                    }
                else:
                    feature_properties = {}
                geojson_feature = geojson.Feature(id=geocode_result['ID'], geometry=geojson_point, properties=feature_properties)
                geojson_feature_list.append(geojson_feature)
            
            geocoded = True

    # Print status every 100 addresses
    if len(results) % 100 == 0:
    	logger.info("Completed {} of {} address".format(len(results), len(addresses)))
            
    # Every 500 addresses, save progress to file(in case of a failure so you have something!)
    if len(results) % 500 == 0:
        pd.DataFrame(results).to_csv("{}_bak".format(output_filename))

# All done
logger.info("Finished geocoding all addresses")

# Create geojson feature collection
geojson_feature_collection = geojson.FeatureCollection(geojson_feature_list)

#------------------------- OUTPUT --------------------------------

# Write the full results to csv using the pandas library.
pd.DataFrame(results).to_csv(output_dir + output_filename, encoding='utf8')

# Write relevant results into geojson
with open(output_dir + "entries.geojson", "w") as outfile:
    geojson.dump(geojson_feature_collection, outfile)