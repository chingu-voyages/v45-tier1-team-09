import { extractYearFromISO, checkEmptyCell, clearElement } from "./utils.js";

var errorMsg = document.getElementById("error-msg")

//meteorrow returns strings make sure ===
//Clean up user inputting zero also gets strings
export function searchData(meteorData, searchInput) {

    var results = meteorData.filter((meteorRow) => {
        var checkName = meteorRow.name.toLowerCase() == searchInput.name || searchInput.name == ""

        var year = extractYearFromISO(meteorRow.year)
        var checkDate = year >= searchInput.minDate && year <= searchInput.maxDate || (searchInput.minDate == 0 && searchInput.maxDate == 0)

        var checkComposition = meteorRow.recclass.toLowerCase() == searchInput.composition || searchInput.composition == ""
        var checkSize = parseInt(meteorRow.mass) >= searchInput.minSize && parseInt(meteorRow.mass) <= searchInput.maxSize || (searchInput.minSize == 0 && searchInput.maxSize == 0)

        return checkName && checkDate && checkComposition && checkSize
    });

    if (results.length == 0) {
        errorMsg.innerHTML = "No macthing property found, displaying all entries"
        errorMsg.style.setProperty("display", "block")
        return meteorData
    } else { return results }
}

const meteorTable = document.getElementById("meteor-table")
export function updateTableJson(searchData, allCheckbox) {
    if (searchData != null) {
        var tableContent = document.getElementById("table-content")
        clearElement(tableContent)
        //Fix this?
        clearElement(allCheckbox)
        searchData.forEach(element => {
            const row = document.createElement("tr")
            row.id = "meteor-row"
            row.innerHTML =
                `<td id="row-checkbox"><input type="checkbox" name="data-row" id="${element.id}"></td>
            <td id="row-id">${checkEmptyCell(element.id)}</td>
            <td id="row-name">${checkEmptyCell(element.name)}</td>
            <td id="row-year">${checkEmptyCell(extractYearFromISO(element.year))}</td>
            <td id=row-composition">${checkEmptyCell(element.recclass)}</td>
            <td id="row-size">${checkEmptyCell(element.mass)}</td>`

            tableContent.append(row)
        });
    }
}

//Only get checkboxes here.Need entire row.
export function getSummary() {
    const tableRow = document.querySelectorAll("#meteor-row")
    const displayAverage = document.getElementById("average")
    const displayTotalHits = document.getElementById("total-hits")

    var averageMass = 0
    var averageTotal = 0
    var totalHits = 0

    tableRow.forEach(row => {
        var checkbox = row.children[0].children[0]
        var size = parseInt(row.children[5].innerHTML)

        if (checkbox.checked) {
            totalHits++
            if (size != NaN) {
                averageMass += size
                averageTotal++
            }
        }
    })
    //Check if there are strikes but no mass(N/A)??
    if(totalHits != 0){
        displayAverage.innerHTML = "Average mass is: " + averageMass / averageTotal
        displayTotalHits.innerHTML = "Total Hits is: " + totalHits
    }else{
        displayAverage.innerHTML = "Please select at least one row to summarize"
    }
    
}

