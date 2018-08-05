<template>
    <div>
    <form class="form">
        <div class="form-group">
            <div class="list-group-item" v-for="item of array">
                <input-container :notValid="item.invalid" :errorMessage="item.errorMsg">
                    <input class="form-control form-control-lg" v-model="item.value" :type="item.type" :placeholder="item.placeholder">
                </input-container>
            </div>
    </div>
    </form>
        <div>
			<button type="button" class="btn btn-primary btn-lg" id="submit">Enviar</button>
			<button type="button" @click="reset" class="btn btn-outline-secondary btn-lg" id="cleanform">Limpar Formulário</button>
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
        invalid: true,
        value: "",
    }
}

function getInput(array, inputID =""){
    let ret = "";
    let ar = this.array.map(e =>{
        if(e.id == inputID){
            ret = e;
        }
    });
    return ret;
}

/*
*   allValid
*   Checks if all values are inside the inputs are valid.
*   If ignoreInvalid is true, the checks will be ignored.
*
*   Valid: return true;
*   Invalid: return false;
*
*/
function allValid(parent){
    if(this.ignoreInvalid = true) return true;

    /*
    *   Name must be: only letters.
    */
    let nameInput = getInput(parent.array, "Name");
   
    /*
    *   Age: only numbers ranging from 0 to 60.
    */
    let ageInput = getInput(parent.array, "Age");
    if(ageInput.value < 0 || ageInput > 60){
        console.log('Invalid Age');
        return false;
    }

    /*
    *   Phone: only numbers. String must be 11 chars long.
    */
    let phoneInput = getInput(parent.array, "Phone");
    if(phoneInput.value.length != 11){
        console.log('Invalid Phone');
        return false;
    }

    /*
    *   Password: Password and Validade Password must be equals.
    */
    let passInput = getInput(parent.array, "Password");
    let validPassInput = getInput(parent.array, "ValidatePassword");
    if(passInput.value != validPassInput.value ){
        console.log('Unmatching Passwords');
        return false;
    }

    return true;
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
        list.push(generateInputValues('Email', 'text', "Insira seu E-mail", "E-mail inválido. Nomes devem conter apenas caracteres e ter um tamanho de 20 caracteres"));
        list.push(generateInputValues('Phone', 'number', "Insira seu Celular", "Celular inválido. Seu celular deve conter apenas numeros e ter exatamente 11 números"));
        list.push(generateInputValues('Password', 'password', "Insira sua Senha", ""));
        list.push(generateInputValues('ValidatePassword', 'password', "Insira sua Senha Novamente", "As senham não condizem"));
        this.array = list.toArray();
    },

    methods:{
        reset(){
            let clean = this.array.map( e => e.value="" );
        },
        submit(){
            allValid(this);
        }
    }



}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
