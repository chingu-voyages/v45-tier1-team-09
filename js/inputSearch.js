export class SearchInput {

    constructor(inputContainer) {
        this.name = "";
        this.minDate = 0;
        this.maxDate = 0;
        this.composition = "";
        this.minSize = 0;
        this.maxSize = 0
        
        inputContainer.forEach(element => {
            this[element.name] = element.value
            if (element.type == "text") {
                this[element.name] = element.value.toLowerCase()
            }
        });
    }
}

export function validate(searchInput){
        var errorMessage = "";

        var checkDate = checkRange(searchInput.minDate, searchInput.maxDate)
        var checkSize = checkRange(searchInput.minSize, searchInput.maxSize)

       if(checkDate || checkSize || (!checkDate && !checkSize)){
            if(!checkDate){
                errorMessage += "Please input a proper date range. <br>"
            } 
            
            if(!checkSize){
                errorMessage += "Please input a proper size range. <br>"
            }

       }
       return errorMessage
      
}

function checkRange(min, max) {
    if (min == 0 && max == 0) {
        return true
    } else if (min != 0 && max == 0 || min == '' && max != 0) {
        return false
    }
    else if (min < 0 || max < 0 || min > max) {
        return false
    } else {
        return true
    }
}

var errorMsg = document.getElementById("input-error-msg")
export function searchData(meteorData, searchInput) {

    var results = meteorData.filter((meteorRow) => {
        var checkName = meteorRow.name == searchInput.name || searchInput.name == ""
        var checkDate = meteorRow.year >= searchInput.minDate && meteorRow.year <= searchInput.maxDate || (searchInput.minDate == 0 && searchInput.maxDate == 0)
        var checkComposition = meteorRow.recclass == searchInput.composition || searchInput.composition == ""
        var checkSize = meteorRow.mass >= searchInput.minSize && meteorRow.mass <= searchInput.maxSize || (searchInput.minSize == 0 && searchInput.maxSize == 0)

        return checkName && checkDate && checkComposition && checkSize
    });

    if (results.length == meteorData.length) {
        errorMsg.innerHTML = "No matching property found, displaying all entries"
        errorMsg.style.setProperty("display", "block")
      
    }  
    return results 
}


export default SearchInput;