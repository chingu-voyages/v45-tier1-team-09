import UserInput from "./user-input.js";
import { updateTableJson, searchData, clearTable } from "./updateTable.js";
import { convertCsvJson } from "./utils.js";

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

allCheckbox.addEventListener('change', () => {
    const checkboxList = document.getElementsByName("data-row");
    checkboxList.forEach((item, index) => {
        allCheckbox.checked ? item.checked = true : item.checked = false
    })
});


var errorMsg = document.getElementById("error-msg")
const clearBtn = document.getElementById("clear-btn")
const searchForm = document.getElementById("search-form")
const searchInput = searchForm.querySelectorAll("input")


clearBtn.addEventListener('click', () => {
    errorMsg.style.setProperty("display", "none")
    clearTable()
    searchForm.reset()
})

//Might want to seperate error message into seperate functions hide/display?

const submitBtn = document.getElementById("submit-btn")
submitBtn.addEventListener('click', () => {
    errorMsg.style.setProperty("display", "none")

    var searchValues = new UserInput(searchInput)
    var validate = searchValues.validate()

    if (validate == "") {
        var searchResults = null
        searchResults = searchData(meteorData, searchValues)
        updateTableJson(searchResults)
    } else {
        clearTable()
        errorMsg.innerHTML = validate
        errorMsg.style.setProperty("display", "block")
    }
})



