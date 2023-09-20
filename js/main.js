import { fetchAPI, fetchCSV } from "./fetchData.js";
import {SearchInput, validate, searchData} from "./inputSearch.js";
import  updateTable from "./displayTable.js";
import updateSummary from "./displaySummary.js"
import histogramPlotPoints from "./histogram.js";

const API = "https://data.nasa.gov/resource/gh4g-9sfh.json"
const CSV = "assets/Meteorite_Landings.csv"

var meteorData;

document.addEventListener("DOMContentLoaded", async () => {
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
        clearElement(meteorTableBody)
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
    histogramPlotPoints(meteorData)
})

// Utils 
function toggleVisibility(element, property) {
    if (element.style.display == "none" || element.style.display == '') {
        element.style.setProperty("display", property)
    } else {
        element.style.setProperty("display", "none")
    }
}

//Input Validation and Error Message

export default function clearElement(element) {
    element.innerHTML = ""
}