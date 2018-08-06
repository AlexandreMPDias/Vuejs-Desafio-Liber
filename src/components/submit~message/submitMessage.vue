<template>
    <div class="pt-5">
        <div class="overlay-background"/> <!-- Attempt to create background -->
        <div class="overlay-foreground">
            <table class="table table-bordered table-hover">
                <tbody v-for="field in info" :key="field.id">
                    <tr class="text-center">
                        <th style="width: 20%">{{ field.id }}: </th>
                        <td style="width: 80%">{{ field.value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>

export default{
    props: [
        'info'
    ]
}
</script>


<style scoped>

.overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}


.overlay-background{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,0);
}

.overlay foreground{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    background-color: white;
    opacity: 1;
}


</style>
