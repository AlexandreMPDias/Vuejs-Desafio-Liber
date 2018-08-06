<template>
    <div>
    <div class="overlay-background">
    </div>
        <div class="overlay-foreground">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">Nome: </th>
                        <td>Mark</td>
                    </tr>
                    <tr>
                        <th scope="row">Email: </th>
                        <td>Jacob@hotmail.com</td>
                    </tr>
                    <tr>
                        <th scope="row">Celular:</th>
                        <td>99823131</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

</template>

<script>

export default{
    props: [
        'infoArray'
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
