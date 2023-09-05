import { fetchAPI, fetchCSV } from "./fetchData.js";
import {SearchInput, validate, searchData} from "./inputSearch.js";
import  updateTable from "./displayTable.js";
import updateSummary from "./displaySummary.js"

const API = "https://data.nasa.gov/resource/gh4g-9sfh.json"
const CSV = "assets/Meteorite_Landings.csv"

var meteorData = "";
var filterData;

window.addEventListener("load", async () => {
    try {
        meteorData = await fetchAPI(API)
    } catch (apiError) {
        console.log(apiError)
        try {
        meteorData = await fetchCSV(CSV)     
        } catch (csvError) {
            console.log(csvError)
        }
    }
})

//Todo: Sorting by category
// document.addEventListener('DOMContentLoaded', ()=> {
//     const headerRow = querySelectorAll("header-row")
//     headerRow.forEach((header) => {
//         header.addEventListener("click", () => {
//             var category = header.getAttribute("name") 
//             searchResults.sort((a,b) => a.category - b.category)
//             //searchResults.sort((a, b) => a.category.localeCompare(b.category));
//         })
//     })
// })

// Dark Mode
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
const checkboxList = document.getElementsByName("data-row");

allCheckbox.addEventListener('change', () => {
    checkboxList.forEach((item, index) => {
        if (allCheckbox.checked) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
});



const clearBtn = document.getElementById("clear-btn")
const searchForm = document.getElementById("search-form")
const errorMsg = document.getElementById("input-error-msg")

clearBtn.addEventListener('click', () => {
    toggleVisibility(errorMsg, "none")
    clearElement(meteorTableBody)
    searchForm.reset()
})


const summarySection = document.getElementById("summary-section")
const submitBtn = document.getElementById("submit-btn")
const searchInput = searchForm.querySelectorAll("input")
var searchResults = null
submitBtn.addEventListener('click', () => {

    if (tableSection.style.display == "none") {
        toggleVisibility(tableSection, "block")
        toggleVisibility(summarySection, "none")
        allCheckbox.checked = false
    }

    toggleVisibility(errorMsg, "none")

    var searchValues = new SearchInput(searchInput)
    var valid = validate(searchValues)
    
    if ( valid == "") {
        searchResults = searchData(meteorData, searchValues)
        updateTable(searchResults, allCheckbox)
    } else {
        errorMsg.innerHTML = valid
        toggleVisibility(errorMsg, "block")
    }
})

const summaryBtn = document.getElementById("summary-btn")
const tableSection = document.getElementById("table-section")
const meteorTableBody = document.getElementById("table-content")

summaryBtn.addEventListener('click', () => {
    toggleVisibility(tableSection, "none")
    toggleVisibility(summarySection, "block")
    updateSummary()
})

const headername = document.getElementById("header-name")
headername.addEventListener("click",  () => {
searchResults.reverse()
updateTable(searchResults, allCheckbox)
})

//Todo: History Maybe?

// Utils 
function toggleVisibility(element, property) {
    if (element.style.display == "none" || element.style.display == '') {
        element.style.setProperty("display", property)
    } else {
        element.style.setProperty("display", "none")
    }
}


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

export default function clearElement(element) {
    element.innerHTML = ""
}
