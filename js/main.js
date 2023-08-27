const darkModeToggle = document.getElementById('dark-mode-toggle');
const displayMode = document.getElementById('display-mode');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        darkModeToggle.classList.remove('fa-toggle-on');
        darkModeToggle.classList.add('fa-toggle-off');
    } else {
        darkModeToggle.classList.remove('fa-toggle-off');
        darkModeToggle.classList.add('fa-toggle-on');
    }
});

//Selecting all checboxes
const allCheckbox = document.getElementById("all-checkbox")

allCheckbox.addEventListener('change', () => {
    const checkboxList = document.getElementsByName("id-number");
    for (i of checkboxList) {
        allCheckbox.checked ? i.checked = true : i.checked = false
    }
});		

//Clear all input fields
const clearBtn = document.getElementById("clear-btn")
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementsByTagName("input")

clearBtn.addEventListener('click', () => {
    for(i in searchInput){
        i.value = ''
    }
})



fetch("assets/Meteorite_Landings.csv")
.then(response => response.text())
.then(csvData => {
  const lines = csvData.split("\n"); // Split data into lines
  const headers = lines[0].split(","); // Extract headers
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }
  
  histogramPlotPoints(data);
})
.catch(error => {
  console.error("Error fetching CSV data:", error);
});



function histogramPlotPoints(data) {
  const yearCount = {}
  const compCount = {}

  data.forEach(element => {

    const year = element.year;
      if (!yearCount[year]) {
        yearCount[year] = 1
      } else {
        yearCount[year]++
      }

    const composition = element.recclass
      if (!compCount[composition]) {
        compCount[composition] = 1
      } else {
        compCount[composition]++
      }
});

  const yearPlotPoints = [];
  for (const year in yearCount) {
    if (yearCount.hasOwnProperty(year)) {
      yearPlotPoints.push({ year: year, count: yearCount[year] });
    }
  }

  const compositionPlotPoints = []
  for (const composition in compCount) {
    if (compCount.hasOwnProperty(composition)){
      compositionPlotPoints.push({composition: composition, count: compCount[composition]})
    }
  }

  
  
console.log(yearPlotPoints)
console.log(compositionPlotPoints)
}


//Input Validation and Error Message

