# Voyage Project Tier 1: Fireball

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Acknowledgements](#acknowledgements)
- [About Chingu](#about-chingu)

## Overview

Meteorite strikes occur when the orbit of a meteorite travels close enough to the Earth to be captured by its gravity field. The U.S. National Aeronautics & Space Administration (NASA) maintains a dataset of all known (>45K) meteorite strikes and sponsors research on these events.

![meteorites](https://www.bing.com/images/create/flaming-meteorites-headed-toward-earth-seen-from-s/64ea2bff66f44bb6a44e9db33eed9204?id=1dPjbiwj4pgyxlGFcjHG0Q%3d%3d&view=detailv2&idpp=genimg&FORM=GCRIDP&mode=overlay)

### 21st Century Meteorite Strikes

## Features

- User can see a landing page containing at least the following components:
  - Search fields allowing them to customize the detail data display.
  - A scrollable detail data display containing the meteorite strike history based on the search criteria.
  - A summary metrics component.

##### Search Component

- User able to filter data in the search component by any of the following:
  - Name
  - Year of strike
  - Meteorite composition (recclass)
  - Mass range (e.g. low to high, inclusive)

##### Detail Data Display Component

  - Displays a clickable button in the column heading to allow the user to sort in ascending or descending sequence based on that column.
  - Displays a clickable button in the column heading to display a popup dialog with a definition of what data is contained in the column.
  - Displays one row for each meteorite strike in the data set.
  - If no search criteria have been selected, then the summary metrics will be for all meteorite strikes.

##### Summary Metrics Component

- Displays the following metrics for the data that has been selected:
  - Total number of strikes
  - Average mass
  - Histogram showing the number of strikes by year
  - Histogram showing the number of strikes by meteorite composition (recclass).


#### Extras (Not Required)

- Supports dark/light mode.
- User options for customizing the font and font size.

## Acknowledgements


Thanks to NASA and its partners for open sourcing this data. You can find more at the [NASA Open Data Portal](https://data.nasa.gov/).

### Authors

Project Managers
  - [Kevin Swartwood](https://github.com/kevinswartwood)
  - [Nevana Walker](https://github.com/)

Developers
  - [Alex Wu](https://github.com/wu-coding)
  - [Shervorn Walker](https://github.com/HardoModo)
  - [Semsi Dogruer](https://github.com/semsi-dogruer)
  - [Josh Catlett](https://github.com/xITSDUCKYx)
    

##  Dependencies
-

## Demo

You can find the demo [here](https://netlify.com)

## About Chingu

If you aren't yet a member of Chingu, we invite you to join us. We help our members transform what they've learned in courses & tutorials into the practical experience employers need and want.