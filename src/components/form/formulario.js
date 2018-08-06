/*

    FUNCTIONS FOR FORMULARIO.VUE

    Public Functions:
    - allValid(parent): recieves the parent element, which contains all data files, and check if all input field are valid.
    - generateInputValues(identification, tp, ph, err): generates an input element.


    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

/*
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    PRIVATE FUNCTIONS

    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

/*
*   Checks if a string only has Characters.
*/
function onlyCharacters(string){
    let onlyChar = true;
    let temp = string.map(e => {
        if((e < 'a' && e > 'z' ) || ( e < 'A' && e > 'Z' ) ){
            onlyChar = false;
        }
    })
    console.log('OnlyChar: ' + onlyChar);
    return onlyChar;
}

/**
*   getInput
*   Sweep the array looking for an id.
*/
function getInput(array, inputID =""){
    let ret = "";
    let ar = array.map(e =>{
        if(e.id == inputID){
            ret = e;
        }
    });
    return ret;
}

/*
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    PUBLIC FUNCTIONS

    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

/*
*   allValid
*   Checks if all values are inside the inputs are valid.
*   If ignoreInvalid is true, the checks will be ignored.
*   In case of any invalid input, an error message will appear. (Input must not be empty)
*
*   Valid: return true;
*   Invalid: return false;
*
*/
function allValid(parent){
    if(parent.ignoreInvalid) {
        console.log('ignoreInvalid is [ true ]');
        return true;
    }
   let valid = true;
    parent.array.map(e => {
        /*
        *   Sweeps the array, if any field is empty, the form is set to invalid.
        *   Also, sets all inputs to valid.
        */
        e.invalid = false;
        if(e.value == ""){
            e.invalid = true;
            valid = false;
        }
    });
 
    /*
    *   Name must be: only letters.
    */
    let nameInput = getInput(parent.array, "Name");
    if(nameInput.value.length > 20 || !/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(nameInput.value)){
        //If the name is a string with only characters, and size smaller than 20.

        console.log('Invalid Name');
        nameInput.invalid = true;
        valid = false;
    }
   
    /*
    *   Age: only numbers ranging from 0 to 60.
    */
    let ageInput = getInput(parent.array, "Age");
    if(ageInput.value <= 0 || ageInput.value >= 60){
        //If age is a natural integer smaller than 60

        console.log('Invalid Age');
        ageInput.invalid = true;
        valid = false;
    }

    /*
    *   Phone: only numbers. String must be 11 chars long.
    */
    let phoneInput = getInput(parent.array, "Phone");
    if(phoneInput.value.length != 11){
        //If phone number's length is not 11.

        phoneInput.invalid = true;
        console.log('Invalid Phone');
        valid = false;
    }

    /*
    *   Password: Password and Validade Password must be equals.
    */
    let passInput = getInput(parent.array, "Password");
    let validPassInput = getInput(parent.array, "ValidatePassword");
    if(!passInput.invalid){
        //If password is not empty

        if(passInput.value != validPassInput.value ){
            //If password and validPassword are not the same.

            validPassInput.invalid = true;
            console.log('Unmatching Passwords');
            valid = false;
        }
    } else {
        validPassInput.invalid = false;
    }
    console.log('Form is valid: ' + valid);
    return valid;
}

generateInputValues = function(identification, tp, ph, err){
    return {
        id: identification,
        type: tp,
        placeholder: ph,
        errorMsg: err,
        invalid: false,
        value: "",
    }
}

module.exports = {
    generateInputValues,
    allValid,
}