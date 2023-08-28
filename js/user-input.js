import { checkRange } from "./utils.js";

class UserInput {

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
    
    validate() {
        var errorMessage = "";

        var checkDate = checkRange(this.minDate, this.maxDate)
        var checkSize = checkRange(this.minSize, this.maxSize)

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
}

export default UserInput;