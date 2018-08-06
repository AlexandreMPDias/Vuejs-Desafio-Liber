<template>
    <div>
        <h1 class="form-text pl-3 pb-2">Preencha o Formulário</h1>
        <form class="form">
            <div class="form-group">
                <div class="list-group-item" v-for="item of array" :key=item.id>
                    <input-container :notValid="item.invalid" :errorMessage="item.errorMsg">
                        <input class="form-control form-control-lg" v-model="item.value" :type="item.type" :placeholder="item.placeholder">
                    </input-container>
                </div>
        </div>
        </form>
        <div class="text-center">
            <div >
                <button type="button" @click="submit" class="btn btn-primary btn-lg" id="submit">Enviar</button>
                <button type="button" @click="reset" class="btn btn-outline-secondary btn-lg" id="cleanform">Limpar Formulário</button>
            </div>
            <label class="row mt-3 btn btn-primary active">
                <input type="checkbox" @click="ignoreInvalid=!ignoreInvalid" unchecked> Ignorar verificação das entradas
                <span class="fa fa-check"></span>
            </label>
        </div>
    </div>
</template>

<script>
import InputContainer from '../input/inputContainer.vue';
var List = require('collections/list');

function generateInputValues(identification, tp, ph, err){
    return{
        id: identification,
        type: tp,
        placeholder: ph,
        errorMsg: err,
        invalid: false,
        value: "",
    }
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

export default {
    components: {
        "input-container": InputContainer
    },

    data () {
        return {
            array: [],
            "ignoreInvalid": false,
        }
    },

    created() {
        let list = new List();
        list.push(generateInputValues('Name', 'text', "Insira seu Nome", "Nome inválido. Nomes devem conter apenas caracteres e ter um tamanho de no máximo 20 caracteres"));
        list.push(generateInputValues('Age', 'number', "Insira sua idade", "Idade inválida. Idade deve ser um valor inteiro entre 0 e 60"));
        list.push(generateInputValues('Email', 'text', "Insira seu E-mail", "Insira seu e-mail para prosseguir"));
        list.push(generateInputValues('Phone', 'number', "Insira seu Celular", "Celular inválido. Seu celular deve conter exatamente 11 números"));
        list.push(generateInputValues('Password', 'password', "Insira sua Senha", "Insira sua senha para prosseguir"));
        list.push(generateInputValues('ValidatePassword', 'password', "Insira sua Senha Novamente", "As senham não condizem"));
        this.array = list.toArray();
    },

    methods:{
        reset(){
            /**
            *   For every input, clear it's content, and set to valid.
            */
            let clean = this.array.map( e => {
                e.value = "";
                e.invalid = false;
            });
        },
        submit(){
            allValid(this);
        },
    }



}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

.btn span.fa-check {    			
	opacity: 0;				
}
.btn.active span.fa-check {				
	opacity: 1;				
}

</style>
