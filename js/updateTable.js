import { extractYearFromISO, checkEmptyCell } from "./utils.js";

var errorMsg = document.getElementById("error-msg")

export function searchData(meteorData, searchInput) {

    var results = meteorData.filter((meteorRow) => {
        var checkName = meteorRow.name.toLowerCase() == searchInput.name || searchInput.name == ""

        var year = extractYearFromISO(meteorRow.year)
        var checkDate = year >= searchInput.minDate && year <= searchInput.maxDate || (searchInput.minDate == 0 && searchInput.maxDate == 0)

        var checkComposition = meteorRow.recclass.toLowerCase() == searchInput.composition || searchInput.composition == ""
        var checkRange = meteorRow.mass >= searchInput.min && meteorRow.mass <= searchInput.max || (searchInput.minSize == 0 && searchInput.maxSize == 0)

        return checkName && checkDate && checkComposition && checkRange
    });

    if (results.length == 0) {
        errorMsg.innerHTML = "No macthing property found, displaying all entries"
        errorMsg.style.setProperty("display", "block")
        return meteorData
    } else { return results }
}

//Alphabet order is in reverse because it appends to pagination

export function updateTableJson(searchData) {
    if (searchData != null) {
        var tableContent = document.getElementById("table-content")
        clearTable()

        searchData.forEach(element => {
            const row = document.createElement("tr")
            row.innerHTML =
                `<td><input type="checkbox" name="data-row" id="${element.id}"></td>
            <td>${checkEmptyCell(element.id)}</td>
            <td>${checkEmptyCell(element.name)}</td>
            <td>${checkEmptyCell(extractYearFromISO(element.year))}</td>
            <td>${checkEmptyCell(element.recclass)}</td>
            <td>${checkEmptyCell(element.mass)}</td>`

            tableContent.append(row)
        });
    }
}

export function clearTable(){
    const tableContent = document.getElementById("table-content")
    tableContent.innerHTML = ""
}
