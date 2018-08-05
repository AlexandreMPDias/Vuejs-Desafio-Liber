<template>
	<div class="container">
		<my-form class="text-center">
		</my-form>
	</div>
</template>

<script>
import myForm from './components/form/formulario.vue';
import myButton from './components/button/myButton.vue';

export default {
	components:{
		'my-form': myForm,
		'my-button': myButton
	},
	data () {
		return {
			
		};
	},


}
</script>

<style>

</style>
