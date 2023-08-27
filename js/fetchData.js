function populateTable(data) {
    console.log(data)

    var tableRow = data.split('\n')

    var tableContent = document.getElementById('table').getElementsByTagName('tbody')[0];
    tableContent.innerHTML = "";

// The variable below controls the amount of rows loaded on the page
// !!! Setting it to tableRow.length will load the entire 40000 rows of data and will break your page
// You have been warned

// var rows = tableRow.length
rows = 100

    for (var row = 1; row < rows; row++) {

        const rowColData1 = [];

        var newRow = tableContent.insertRow();

        rowColData = tableRow[row].split(',');

        rowColData[9] = rowColData[9].slice(2)

        rowColData1.push(rowColData[1], rowColData[0], rowColData[6], rowColData[3], rowColData[4], rowColData[8], rowColData[9]);

        for (var col = 0; col < rowColData1.length; col++) {

             var newCell = newRow.insertCell();
            newCell.innerHTML = rowColData1[col];

        }
    }
}

fetch("assets/Meteorite_Landings.csv")
  .then((res) => res.text())
  .then((text) => {
    populateTable(text)
   })
  .catch((e) => console.error(e));