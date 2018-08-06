<template>
    <div>
        <h1 class="form-text pl-3 pb-2">Preencha o Formulário</h1>
        <form class="form">
            <div class="form-group">
                <div class="list-group-item" v-for="item of array" :key=item.id>
                    <input-container :inputValues="item" />
                </div>
        </div>
        </form>
        <div class="text-center">
            <div >
                <button type="button" @click="submit()" class="btn btn-primary btn-lg">Enviar</button>
                <button type="button" @click="reset()" class="btn btn-outline-secondary btn-lg">Limpar Formulário</button>
            </div>
            <label class="row mt-3 btn btn-primary active">
                <input type="checkbox" @click="ignoreInvalid=!ignoreInvalid" unchecked> Ignorar verificação das entradas
                <span class="fa fa-check"></span>
            </label>
        </div>
    </div>
</template>

<script>

import { EventBus } from '../../eventbus.js'
import InputContainer from '../input/inputContainer.vue';
const List = require('collections/list');
var form = require('./formulario.js');

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
        list.push(form.generateInputValues('Name', 'text', "Insira seu Nome", "Nome inválido. Nomes devem conter apenas caracteres e ter um tamanho de no máximo 20 caracteres"));
        list.push(form.generateInputValues('Age', 'number', "Insira sua idade", "Idade inválida. Idade deve ser um valor inteiro entre 0 e 60"));
        list.push(form.generateInputValues('Email', 'text', "Insira seu E-mail", "Insira seu e-mail para prosseguir"));
        list.push(form.generateInputValues('Phone', 'number', "Insira seu Celular", "Celular inválido. Seu celular deve conter exatamente 11 números"));
        list.push(form.generateInputValues('Password', 'password', "Insira sua Senha", "Insira sua senha para prosseguir"));
        list.push(form.generateInputValues('ValidatePassword', 'password', "Insira sua Senha Novamente", "As senham não condizem"));
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
            /*
            *   Checks if all inputs are valid, and send an event to the Global Bus Event.
            */
            if(form.allValid(this)){
                let list = new List();
                let ar = this.array.map( e => {
                    if(e.value == ""){
                        e.value = "N/A";
                    }
                    if(e.id != "ValidatePassword"){
                        list.push({id: e.id, value: e.value});
                    }
                })
                EventBus.$emit('submitted', list.toArray());
            }
        },
    }



}
</script>

<style scoped>

.btn span.fa-check {    			
	opacity: 0;				
}
.btn.active span.fa-check {				
	opacity: 1;				
}

</style>
