import displayTable from "./displayTable.js";

displayTable(document.querySelector("table"));
/* async function getData() {
  const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
  const data = await response.json();
  return data;

  //console.log(data);
}

const meteoriteData = getData();
console.log(meteoriteData); */

/* const htmlContentArray = meteoriteData.map((meteorite) => {
  return `
<tr>
						<td data-cell="input"><input type="checkbox" name="id-number" id="id"></td>	
						<td data-cell="id">1</td>
						<td data-cell="name">${meteorite.name}</td>
						<td data-cell="year">Snow</td>
						<td data-cell="meteorite">26</td>
						<td data-cell="size">Jon Snow</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>

`;
}); */
//console.log(htmlContentArray());
const darkModeToggle = document.getElementById("dark-mode-toggle");
const displayMode = document.getElementById("display-mode");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeToggle.classList.remove("fa-toggle-on");
    darkModeToggle.classList.add("fa-toggle-off");
  } else {
    darkModeToggle.classList.remove("fa-toggle-off");
    darkModeToggle.classList.add("fa-toggle-on");
  }
});

//Selecting all checboxes
const allCheckbox = document.getElementById("all-checkbox");

allCheckbox.addEventListener("change", () => {
  const checkboxList = document.getElementsByName("id-number");
  for (i of checkboxList) {
    allCheckbox.checked ? (i.checked = true) : (i.checked = false);
  }
});

//Clear all input fields
const clearBtn = document.getElementById("clear-btn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementsByTagName("input");

clearBtn.addEventListener("click", () => {
  for (i in searchInput) {
    i.value = "";
  }
});

//Input Validation and Error Message
