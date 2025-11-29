# EIA Graphs

Site - https://eia.languagelatte.com

The EIA provides monthly electricity data.
Additionally the EIA provides a few simple line charts.
This project provides some additional charts for this data. 

# Running this Project
Just open the html file. 

# Building this Project

## Optional: If you want to download fresh data from eia.gov
1. Get an API key from the EIA. - https://www.eia.gov/opendata/register.php
2. Set the API key as an OS variable - `export EIA_API_KEY="yourKey"`
3. Run the python file to get the latest data. `python3 download.py`

## Option 1 - With Typescript: 
1. Open the devcontainer in docker, or have the typescript compiler installed locally.
2. run `tsc` to compile the `.ts` files to `.js` files.
3. Open `index.html`.

## Option 2 - Without Typescript:
1. Ignore the typescript files and just edit the javascript files directly.
2. Open `index.html`.

# TypeScript
I have not decided if I want ot leave TypeScript in this project.
On one hand I like the simplicity of needing nothing but a browser. 
But on the other hand TypeScript makes it much easier to reason about the code.
For now the Javascript is still left in the repo because thats what I upload to Cloudflare when updating the site.

# Energy vs Electricity
The EIA has data for both energy and electricity. 
These are **very** different concepts. 
So far I have avoided adding the energy data because the charts are highly misleading to anyone unless they understand the difference between energy and electricity.

# TODO
1. Add graph for capacity factors.
2. Add links to other good sources of data.
3. Add 2nd and 3rd derivative graphs.
4. Update growth projection to be more clear.
5. Make it more clear what lookback window and rolling window mean.