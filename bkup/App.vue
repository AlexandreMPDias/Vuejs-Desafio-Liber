<template>
	<div>
		<nav class="navbar navbar-dark bg-dark">
			<div style="height: 80px;">
				<img class="h-100 pl-5" src="..\data\logo_amarelo.svg" alt="Italian Trulli">
			</div>
		</nav>
		<div class="container">
			<my-form class="pt-5" v-if="validForm" />
			<sbmt-msg  v-else />
		</div>
	</div>
</template>

<script>
import myForm from './components/form/formulario.vue';
import submitMsg from './components/submit~message/submitMessage.vue';

export default {
	components:{
		'my-form': myForm,
		'sbmt-msg': submitMsg
	},
	data () {
		return {
			formdata: {},
			validForm: false
		};
	},


}
</script>

