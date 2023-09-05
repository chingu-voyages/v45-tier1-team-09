import clearElement from "./main.js";

export default function updateTable(searchData, allCheckbox) {
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
            <td id="row-id">${element.id}</td>
            <td id="row-name">${element.name}</td>
            <td id="row-year">${element.year}</td>
            <td id=row-composition">${element.recclass}</td>
            <td id="row-size">${element.mass}</td>`

            tableContent.append(row)
        });
    }
}