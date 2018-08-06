<template>
	<div>
		<nav class="navbar navbar-dark bg-dark">
			<div style="height: 80px;">
				<img class="h-100 pl-5" src="..\data\logo_amarelo.svg" alt="Italian Trulli">
			</div>
		</nav>
		<div class="container">
			<!--
				Show the form, if all input values are not yet valid and the user hasn't clicked 'Submit'.
			-->
			<my-form class="pt-5" v-if="!validForm" @click.native="checkChanges()" />

			<!--
				When user clicks 'Submit', validForm changes state and the form desappears, and the values written in the inputs are shown.
			-->
			<sbmt-msg :info="info" v-else/>
		</div>
	</div>
</template>

<script>
import { EventBus } from './eventbus.js';
import myForm from './components/form/formulario.vue';
import submitMsg from './components/submit~message/submitMessage.vue';

var data_information = null;

EventBus.$on('submitted', info => {
  data_information = info;
});

export default {
	components:{
		'my-form': myForm,
		'sbmt-msg': submitMsg
	},
	data () {
		return {
			validForm: false,
			info: {}//[{id: "Abacate",value: "Batata"},{id: "Abacate",value: "Batata"},{id: "Abacate",value: "Batata"},{id: "Abacate",value: "Batata"}],
		};
	},

	methods: {
		checkChanges: function(){
			if(data_information != null){
				this.validForm = true;
			}
		}
	},

	beforeUpdate() {
		this.info = data_information;
	}


}
</script>

