<template>
	<div>
		<h1 class="form-text pl-3 pb-2">Preencha o Formulário</h1>
		<form class="form">
			<div class="form-group">
				<div class="list-group-item" v-for="item of getInfo" :key=item.id>
					<input-container :inputValues="item" />
				</div>
		</div>
		</form>
		<div class="text-center">
			<div >
				<button type="button" @click="isFormValid" class="btn btn-primary btn-lg">Enviar</button>
				<!--<button type="button" @click="reset()" class="btn btn-outline-secondary btn-lg">Limpar Formulário</button>-->
				<!-- No actual reason to create this .vue, I just wanted to test how to send an event from child to father -->
				<btn @doReset="resetForm">Limpar</btn>
			</div>
			<label class="row mt-3 btn btn-primary active">
				<input type="checkbox" @click="toggleIgnore" unchecked> Ignorar verificação das entradas
				<span class="fa fa-check"></span>
			</label>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '../buttons/Btn.vue';
import InputContainer from '../input/inputContainer.vue';
var form = require('./formulario.js');

export default {
	name: 'Formulario',

	components: {
		"input-container": InputContainer,
		"btn": Button, 
	},

	computed: mapGetters([
    	'getInfo', 'getValidation'
  	]),

	methods:{
		...mapActions({
			isFormValid: 'isFormValid',
			resetForm: 'resetForm',
			toggleIgnore: 'toggleIgnore',
		})
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
