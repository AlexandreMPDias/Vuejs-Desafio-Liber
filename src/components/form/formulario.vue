<template>
	<div>
		<h1 class="form-text pl-3 pb-2">Preencha o Formulário</h1>
		<form class="form">
			<div class="form-group">
				<div class="list-group-item" v-for="item of inputs" :key=item.id>
					<input-container :inputValues="item" />
				</div>
		</div>
		</form>
		<div class="text-center">
			<div >
				<button type="button" @click="submit()" class="btn btn-primary btn-lg">Enviar</button>
				<!--<button type="button" @click="reset()" class="btn btn-outline-secondary btn-lg">Limpar Formulário</button>-->
				<!-- No actual reason to create this .vue, I just wanted to test how to send an event from child to father -->
				<btn @doReset="reset()">Limpar</btn>
			</div>
			<label class="row mt-3 btn btn-primary active">
				<input type="checkbox" @click="ignoreInvalid=!ignoreInvalid" unchecked> Ignorar verificação das entradas
				<span class="fa fa-check"></span>
			</label>
		</div>
	</div>
</template>

<script>

import Button from '../buttons/Btn.vue';
import InputContainer from '../input/inputContainer.vue';
var form = require('./formulario.js');

export default {
	components: {
		"input-container": InputContainer,
		"btn": Button, 
	},

	props: [
		'valid'
	],

	data () {
		return {
			/**
			*	   id: 				An identification, to identify(duh) which input in the inputs is it.
			*	   type: 			The type of input.
			*	   Placeholder:		The placeholder messager for the input.
			*	   ErrorMessage: 	The error message to be shown in case the user inserts an invalid input.
			*	   Value: 			The value inside the input. Default = "".
			*
			*		List of IDs:
			*			- Name
			*			- Age
			*			- Email
			*			- Phone
			*			- Password
			*			- ValidadePassword
			*
			*/
			inputs: [],
			"ignoreInvalid": false,
		}
	},

	created() {
		this.inputs = form.generateArrayOfFields();
	},

	methods:{
		reset(){
			/**
			*   For every input, clear it's content, and set to valid.
			*/
			let clean = this.inputs.map( e => {
				e.value = "";
				e.invalid = false;
			});
		},
		submit(){
			/*
			*   Checks if all inputs are valid, and send an event to the Global Bus Event.
			*/
			if(form.allValid(this.inputs, this.ignoreInvalid)){
				let necessaryInputs = form.getNecessaryValues(this.inputs);
				this.inputs = form.reset(this.inputs);
				this.$emit('submmited', necessaryInputs);
			}
		},
	},




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
