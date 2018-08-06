<template>
	<button type="button" @click="reset()" class="btn btn-outline-secondary btn-lg">Limpar Formulário</button>
</template>


<script>
export default {
	methods: {
			reset(){
				this.$emit('doReset', 1);
		}
	}
}
</script>

<style scoped>

</style>