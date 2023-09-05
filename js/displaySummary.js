export default function updateSummary(meteorData) {
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
        displayAverage.innerHTML = "Average mass is: " + Math.round(averageMass / averageTotal)
        displayTotalHits.innerHTML = "Total Hits is: " + totalHits
    }else{
        displayAverage.innerHTML = "Please select at least one row to summarize"
        displayTotalHits.innerHTML = ""
    }
}

