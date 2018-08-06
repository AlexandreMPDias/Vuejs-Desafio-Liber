<template>
	<div>
		<nav class="navbar navbar-dark bg-dark">
			<div style="height: 80px;" @click="restart">
				<img class="h-100 pl-5" src="..\data\logo_amarelo.svg" alt="Italian Trulli">
			</div>
		</nav>
		<div class="container">
			<!--
				Show the form, if all input values are not yet valid and the user hasn't clicked 'Submit'.
			-->
			<!--<my-form class="pt-5" v-if="!validForm" @click.native="checkChanges()" @submmited="data_information = $event" />-->
			<my-form class="pt-5" v-if="!getValidation" @submmited="submit($event)" />
			<!--
				When user clicks 'Submit', validForm changes state and the form desappears, and the values written in the inputs are shown.
			-->
			<sbmt-msg :info="getNecessaryValues" />
		</div>
	</div>
</template>

<script>

import myForm from './components/form/formulario.vue';
import submitMsg from './components/submit~message/submitMessage.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	components:{
		'my-form': myForm,
		'sbmt-msg': submitMsg,
	},

	computed: mapGetters([
		'getNecessaryValues', 'getValidation'
	]),

	methods: {
		submit: function(info) {
			this.$store.state.info = info;
			this.$store.state.validForm = true;
		},
		...mapActions([
			'restart'
		])
	},



}
</script>

