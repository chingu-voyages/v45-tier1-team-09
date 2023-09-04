//Get Data from API or JSON
export async function fetchAPI(API) {
    var response = await fetch(API)
    return JSON.parse(await response.text(), addTypeToObject)
}

export async function fetchCSV(CSV) {
    var response = await fetch(CSV)
    return convertCsvToObject(await response.text())
}

//Process Data.
function addTypeToObject(key, value) {
    if ((key === "name" || key === "recclass")) {
        return value != undefined ? value.toLowerCase() : "N/A"
    } else if (key === "year") {
        return value != undefined ? extractYearFromISO(value) : "N/A"
    } else if (key === "mass" || key == "id") {
        return value != undefined ? parseInt(value) : "N/A"
    } else {
        return value != undefined ? value : "N/A"
    }
}



//Because it splits at "," it messes up Geolocation data, but not relevant since we dont display that info.

function convertCsvToObject(meteorData) {
    var tableRow = meteorData.split('\n')
    var headers = tableRow[0].split(',')
    //Change mass (g) to mass -- Same as JSON response
    headers[4] = "mass"

    const meteorJSON = []

    for (var i = 1; i < tableRow.length; i++) {
        var tableCell = tableRow[i].split(',')
        const entry = {}
        for (var j = 0; j < headers.length; j++) {
            var key = headers[j]
            var value = tableCell[j]
            if (tableCell != '') {
                if (key == "name" || key == "recclass") {
                    value = value.toLowerCase()
                } else if (key == "year") {
                    value = extractYearFromISO(value)
                } else if (key == "mass" || key == "id") {
                    value = parseInt(value)
                    //entry[headers[j]] = tableCell[j]
                } 
                
            }else {
                value = "N/A"
            }
            entry[key] = value
        } 
        meteorJSON.push(entry)
    }
    return meteorJSON
}

function extractYearFromISO(isoDate) {
    const date = new Date(isoDate)
    return date.getFullYear()
}
