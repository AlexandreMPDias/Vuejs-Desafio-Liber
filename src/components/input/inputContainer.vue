<template>
    <div>
        <input class="form-control form-control-lg" v-model="inputValues.value" :type="inputValues.type" :placeholder="inputValues.placeholder">
        <small class="form-text text-danger" v-show="inputValues.invalid">
            {{ inputValues.errorMsg }}
        </small>
    </div>
</template>

<script>
export default {
    props: [
        'inputValues'
    ]
}
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
</style>