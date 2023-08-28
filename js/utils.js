function checkEmptyCell(cellData) {
    if (cellData == undefined || cellData == NaN || cellData == "Unknown") {
        return "N/A"
    } else {
        return cellData
    }
}

function extractYearFromISO(isoDate) {
    const date = new Date(isoDate)
    return date.getFullYear()
}

//Get header

function convertCsvJson(meteorData) {
    var tableRow = meteorData.split('\n')
    var headers = tableRow[0].split(',')

    const meteorJSON = []

    for (var i = 1; i < tableRow.length; i++) {
        var tableCell = tableRow[i].split(',')
        const entry = {}
        for (var j = 0; j < headers.length; j++) {
            if (tableCell != '') {
                entry[headers[j]] = tableCell[j]
            }
        }
        meteorJSON.push(entry)
    }

    return meteorJSON
}

function checkRange(min,max){
    if(min ==0 && max == 0){
        return true
    }else if(min !=0 && max == 0 || min == '' && max != 0){
        return false
    }
    else if(min < 0 || max < 0 || min > max  ){
        return false
    }else{
        return true
    }
}

export { convertCsvJson, checkEmptyCell, extractYearFromISO, checkRange }