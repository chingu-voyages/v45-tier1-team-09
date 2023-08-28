import UserInput from "./user-input.js";
import { getApiData, getCsvData } from "./fetchData.js";
import { updateTableJson, searchData, clearTable } from "./updateTable.js";



var meteorData;

//Todo: Read from CSV
window.addEventListener("load", async () => {
    try {   
       meteorData = await getApiData()
    } catch (error) {
        console.log("Failed to retrieve data fom Api, using CSV instead")
        console.log(error)
        
        meteorData = await getCsvData()
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


var errorMsg =  document.getElementById("error-msg")
const clearBtn = document.getElementById("clear-btn")
const searchForm = document.getElementById("search-form")
const searchInput = searchForm.querySelectorAll("input")


clearBtn.addEventListener('click', () => {
    errorMsg.style.setProperty("display" , "none")
    clearTable()
    searchForm.reset()
    // for (let i = 0; i < searchInput.length; i++) {
    //     if(searchInput.type == "text"){
    //         searchInput[i].value = ''
    //     }else if(searchInput.type == "number"){
    //         searchInput[i].value = 0
    //     }
    // }
})

//Might want to seperate error message into seperate functions hide/display?

const submitBtn = document.getElementById("submit-btn")
submitBtn.addEventListener('click', () => {  
    errorMsg.style.setProperty("display" , "none")
    
    var searchValues = new UserInput(searchInput)
    var validate = searchValues.validate()
    
    if (validate  == "") {
        var searchResults = null
        searchResults = searchData(meteorData, searchValues)
        updateTableJson(searchResults)
    }else{
       errorMsg.innerHTML=validate
       errorMsg.style.setProperty("display" , "block")
    }
})



