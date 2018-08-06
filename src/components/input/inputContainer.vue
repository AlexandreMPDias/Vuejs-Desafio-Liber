<template>
	<div>
		<slot>
			<!-- Space to add any chield element. -->
		</slot>
		<!--
		<div v-if="isName()">
			<h1>ok</h1>
		</div>

		======== ? Which one is best practise ? ========= 

		<div v-if="this.inputValues.id == 'Name'">
			<h1>ok</h1>
		</div>
		-->

		<!-- If: input.id is 'Name' -->
		<div class="input-group" v-if="isName()">
			<input :type="inputValues.type" v-model="inputValues.value" class="form-control form-control-lg" :placeholder="inputValues.placeholder">
			<div @click="executeName()" class="input-group-append">
				<span class="input-group-text" id="basic-addon2">Extrair Primeiro Nome</span>
			</div>
		</div>

		<!-- If: input.id is 'Password' -->
		<div class="input-group" v-else-if="isPassword()">
			<input :type="inputValues.type" v-model="inputValues.value" class="form-control form-control-lg" :placeholder="inputValues.placeholder">
			<div class="input-group-append">
				<span class="input-group-text" @click="hide_show_password()" v-if="inputValues.type == 'password'">Ver Senha</span>
				<span class="input-group-text" @click="hide_show_password()" v-else>Esconder Senha</span>
			</div>
		</div>

		<!-- Else -->
		<div v-else>
			<input class="form-control form-control-lg" v-model="inputValues.value" :type="inputValues.type" :placeholder="inputValues.placeholder">
		</div>

		<small class="form-text text-danger" v-show="inputValues.invalid">
			{{ inputValues.errorMsg }}
		</small>
	</div>
</template>

<script>

var m = require('./inputContainer.js');

export default {
	name: 'InputContainer',

	props: [
		'inputValues'
	],

	methods: {
		isName(){
			return (this.inputValues.id == "Name");
		},
		isPassword(){
			return (this.inputValues.id == "Password");
		},
		executeName(string){
			this.inputValues.value = m.extractFirstName(this.inputValues.value);
		},
		hide_show_password(){
			if(this.inputValues.type == 'password'){
				this.inputValues.type = 'text';
			} else{
				this.inputValues.type = 'password';
			}
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