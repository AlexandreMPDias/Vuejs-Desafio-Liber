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
	Imports
*/
const List = require('collections/list');


/**
*   getInput
*   Sweep the inputs looking for an id.
*/
function getInput(inputs, inputID =""){
	let ret = "";
	let ar = inputs.map(e =>{
		if(e.id == inputID){
			ret = e;
		}
	});
	return ret;
};

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
function allValid(inputs, ignoreInvalid){
	console.log('Ignore invalid set to: ' + ignoreInvalid);
	if(ignoreInvalid) {
		console.log('allValid: returning [ true ]');
		return true;
	}
	console.log('AllValid: Performing Checks');
    let valid = true;
	inputs.map(e => {
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
	let nameInput = getInput(inputs, "Name");
	if(nameInput.value.length > 20 || !/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(nameInput.value)){
		//If the name is a string with only characters, and size smaller than 20.

		console.log('Invalid Name');
		nameInput.invalid = true;
		valid = false;
	}
   
	/*
	*   Age: only numbers ranging from 0 to 60.
	*/
	let ageInput = getInput(inputs, "Age");
	if(ageInput.value <= 0 || ageInput.value >= 60){
		//If age is a natural integer smaller than 60

		console.log('Invalid Age');
		ageInput.invalid = true;
		valid = false;
	}

	/*
	*   Phone: only numbers. String must be 11 chars long.
	*/
	let phoneInput = getInput(inputs, "Phone");
	if(phoneInput.value.length != 11){
		//If phone number's length is not 11.

		phoneInput.invalid = true;
		console.log('Invalid Phone');
		valid = false;
	}

	/*
	*   Password: Password and Validade Password must be equals.
	*/
	let passInput = getInput(inputs, "Password");
	let validPassInput = getInput(inputs, "ValidatePassword");
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
	console.log('allValid: returning [ '+ valid +' ]');
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
};

/*
*   Generates an inputs of fields where each element in the inputs is made of:
*	   id: An identification so it is possible to know which input in the inputs is it.
*	   type: The type of input.
*	   Placeholder: The placeholder messager for the input.
*	   ErrorMessage: The error message to be shown in case the user inserts an invalid input.
*	   Value: The value inside the input. Default = "".
*/
function generateArrayOfFields(){
	let list = new List();
	list.push(generateInputValues('Name', 'text', "Insira seu Nome", "Nome inválido. Nomes devem conter apenas caracteres e ter um tamanho de no máximo 20 caracteres"));
	list.push(generateInputValues('Age', 'number', "Insira sua idade", "Idade inválida. Idade deve ser um valor inteiro entre 0 e 60"));
	list.push(generateInputValues('Email', 'text', "Insira seu E-mail", "Insira seu e-mail para prosseguir"));
	list.push(generateInputValues('Phone', 'number', "Insira seu Celular", "Celular inválido. Seu celular deve conter exatamente 11 números"));
	list.push(generateInputValues('Password', 'password', "Insira sua Senha", "Insira sua senha para prosseguir"));
	list.push(generateInputValues('ValidatePassword', 'password', "Insira sua Senha Novamente", "As senham não condizem"));
	return list.toArray();
};

/*
*   reset
*   Resets the arrays, setting all 'value' fields to empty strings.
*   Set password type to 'password', in case password was set to visible.
*/
function reset(inputs){
	let ret = inputs.map(e => {
        e.value = "";
        if(e.id == "Password"){
            e.type = "password";
        }
	});
};

/*
*   getNecessaryValues
*   Extract the [ id , value ] fields from the inputs.
*/
function getNecessaryValues(inputs){
    let list = new List();
    let ar = inputs.map( e => {
        if(e.value == ""){
            e.value = "N/A";
        }
        if(e.id != "ValidatePassword"){
            list.push({id: e.id, value: e.value});
        }
    });
    return list.toArray();
};

module.exports = {
	generateInputValues,
	allValid,
	generateArrayOfFields,
    reset,
    getNecessaryValues,
}