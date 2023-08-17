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


//Input Validation and Error Message

