# EIA Graphs

The EIA provides monthly electricity data.
Additionally the EIA provides a few simple line charts.
This project provides some additional charts for this data. 
See eia.html for more details.

## Running this Project
Just open the html file. 

## Building this Project
1. Get an API key from the EIA. - https://www.eia.gov/opendata/register.php
2. Set the API key as an OS variable - `export EIA_API_KEY="yourKey"`
3. Run the python file to get the latest data. `python3 download.py`
4. Open the html file.