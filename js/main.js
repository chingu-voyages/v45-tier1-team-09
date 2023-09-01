import SearchInput from "./search-input.js";
import { updateTableJson, searchData, getSummary } from "./updateTable.js";
import { convertCsvJson, toggleVisibility, clearElement } from "./utils.js";

const API = "https://data.nasa.gov/resource/gh4g-9sfh.json"
const CSV = "assets/Meteorite_Landings.csv"
var meteorData;


//Todo: Read from CSV
window.addEventListener("load", async () => {
    var response
    var responseText
    try {
        response = await fetch(API)
        meteorData = await response.json();
    } catch (apiError) {
        console.log("Failed to retrieve data fom Api, using CSV instead\n" +  apiError)
        try {
            response = await fetch(CSV)
            responseText = await response.text()
            meteorData = convertCsvJson(responseText)
            console.log(meteorData)
        } catch (csvError) {
            console.log("Failed to retrieve data from CSV \n" + csvError)
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
  //Make sure that there is something in table  
    checkboxList.forEach((item, index) => {
        if(allCheckbox.checked){
            item.checked = true
          
        }else{
            item.checked = false
        }
    })
});



const meteorTable = document.getElementById("meteor-table")
const meteorTableBody = document.getElementById("table-content")


const errorMsg = document.getElementById("error-msg")
const clearBtn = document.getElementById("clear-btn")
const searchForm = document.getElementById("search-form")
const searchInput = searchForm.querySelectorAll("input")


clearBtn.addEventListener('click', () => {
    toggleVisibility(errorMsg, "none")
    clearElement(meteorTableBody)
    searchForm.reset()
})

//Might want to seperate error message into seperate functions hide/display?
//Submit calls table back?
//If we search same thing again prolem?
const summary = document.getElementById("summary")
const submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener('click', () => {

    if (meteorTable.style.display == "none"){
        toggleVisibility(meteorTable, "block")
        toggleVisibility(summary, "none")
    }

    toggleVisibility(errorMsg, "none")
    summaryBtn.disabled = false
   
    var searchValues = new SearchInput(searchInput)
    var validate = searchValues.validate()

    if (validate == "") {
        var searchResults = null
        searchResults = searchData(meteorData, searchValues)
        updateTableJson(searchResults,allCheckbox)
    } else {
        clearElement(meteorTableBody)
        errorMsg.innerHTML = validate
        toggleVisibility(errorMsg, "block")
    }
})

const summaryBtn = document.getElementById("summary-btn")
//Disable summary after clicking twice?

summaryBtn.addEventListener('click', () => {
    toggleVisibility(meteorTable, "none")
    toggleVisibility(summary, "block")
    getSummary()
    summaryBtn.disabled = true
    //Prevent from double clicking
    // if(summary.style.display == "none" || summary.style.display == ''){
    //     toggleVisibility(summary, "block")
    // }
})

