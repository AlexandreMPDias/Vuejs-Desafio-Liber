/*

	FUNCTIONS FOR INPUTCONTAINER.VUE

	Public Functions:
	- extractFirstName

	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

/*
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	PRIVATE FUNCTIONS

	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/


/*
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	PUBLIC FUNCTIONS

	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

/*
*   extractFirstName
*   Splits the string using the [WhiteSpace] character as delimitator,
*   and returns the first string in the array.
*/
function extractFirstName(fullName){
    if(fullName & fullName == ""){
        return "";
    }
    let arrayOfNames = fullName.split(' ');
    console.log(arrayOfNames[0]);
    return arrayOfNames[0];
}

module.exports = {
    extractFirstName,
}