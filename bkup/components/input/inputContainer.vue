<template>
    <div>
        <slot>
            <!--
                Input field goes here.
            -->
        </slot>
        <small class="form-text text-danger" v-show="notValid">
            {{ errorMessage }}
        </small>
    </div>
</template>

<script>
export default {
    props: [
        'notValid', 'errorMessage'
    ]
}
</script>

<style>

</style>