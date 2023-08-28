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
            } else if (element.type == "number") {
                if (element.value == '') this[element.name] = 0
            }
        });
        //If missing number for range, make sure both equal for simplicity sake
        // if (this.minDate == 0 || this.maxDate == 0) this.equalizeDate();
        // if (this.minSize == 0 || this.maxSize == 0) this.equalizeSize();

    }

    equalizeDate() {
        this.minDate < this.maxDate ? this.minDate = this.maxDate : this.maxDate = this.minDate
    }

    equalizeSize() {
        this.minSize < this.maxSize ? this.minSize = this.maxSize : this.maxSize = this.minSize
    }

    //TODO: Look this over
    //Scan for non-alpha numeric numbers?
    validate() {
        var errorMessage = "";
  
    // Check if both inputs zero
        var checkDateRange = this.minDate < 0 || this.maxDate < 0 || this.minDate > this.maxDate || (this.minDate == 0 && this.maxDate == 0)
        var checkSizeRange = this.minSize < 0 || this.maxSize < 0 || this.minSize > this.maxSize || (this.minSize == 0 && this.maxSize == 0)

            if(!checkDateRange || !checkSizeRange){
                if (checkDateRange) {
                    errorMessage += "Please input a proper date range. <br>"
                } else {
                    this.equalizeDate
                }
                if (checkSizeRange) {
                    errorMessage += "Please input a proper size range. <br>"
                } else {
                    this.equalizeSize
                }
            }
        return errorMessage;
    }
}

export default UserInput;