# Voyage Project Tier 1: Fireball

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Acknowledgements](#acknowledgements)
- [About Chingu](#about-chingu)

## Overview

Meteorite strikes occur when the orbit of a meteorite travels close enough to the Earth to be captured by its gravity field. The U.S. National Aeronautics & Space Administration (NASA) maintains a dataset of all known (>45K) meteorite strikes and sponsors research on these events.

![meteorite strike map](https://github.com/chingu-voyages/voyage-project-tier1-fireball/raw/main/assets/21st_century_meteorite_strikes.png)

### 21st Century Meteorite Strikes

## Features

- User can see a landing page containing at least the following components:
  - Search fields allowing them to customize the detail data display.
  - A scrollable detail data display containing the meteorite strike history based on the search criteria.
  - A summary metrics component.

##### Search Component

- User will be able to filter data in the search component by any of the following:
  - Name
  - Year of strike
  - Meteorite composition (recclass)
  - Mass range (e.g. low to high, inclusive)

##### Detail Data Display Component

- Displays one row for each meteorite strike in the data set.
- If no search criteria have been selected, then the summary metrics will be for all meteorite strikes.

##### Summary Metrics Component

- Displays the following metrics for the data that has been selected:
  - Total number of strikes
  - Average mass
  - Histogram showing the number of strikes by year
  - Histogram showing the number of strikes by meteorite composition (recclass).
- If no search criteria have been selected, then the summary metrics will be for all meteorite strikes.

#### Extras (Not Required)

- Support dark/light mode.
- Allow the user options for customizing the font and font size.
  
##### Search Component

- Allow search criteria to be saved across sessions and reselected from a dropdown.

##### Detail Data Display Component

- Display a clickable button in the column heading to allow the user to sort in ascending or descending sequence based on that column.
- Display a clickable button in the column heading to display a popup dialog with a definition of what data is contained in the column.

##### Summary Metrics Component

- In addition to the metrics for the selected data, also display these metrics for the entire dataset. This should be suppressed if there is no search criteria so the display isn't duplicated:
  - Total number of strikes
  - Average mass
  - Histogram showing the number of strikes by year
  - Histogram showing the number of strikes by meteorite composition (recclass).

##### General



## Acknowledgements


Thanks to NASA and its partners for open sourcing this data. You can find more at the [NASA Open Data Portal](https://data.nasa.gov/).

### Authors

  [Alex Wu](https://github.com/wu-coding)
  [Shervorn](https://github.com/HardoModo)
  [Kevin Swartwood](https://github.com/kevinswartwood)
  [Semsi Dogruer](https://github.com/semsi-dogruer)
  [Josh Catlett](https://github.com)
    

##  Dependencies
-

## Demo

You can find the demo [here](https://netlify.com)

## About Chingu

If you aren't yet a member of Chingu, we invite you to join us. We help our members transform what they've learned in courses & tutorials into the practical experience employers need and want.
