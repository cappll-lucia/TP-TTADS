
<script lang="ts">
export let data;
const {provinceId, locationId, nombre} =data;

</script>

<div class="container">
    <h1>Búsqueda de profesional por Localidad</h1>
    <h4>No se econtrarion profesionales para la localidad {nombre} </h4>
    <span>Id provincia: {provinceId} | Id localidad: {locationId}</span>
</div>

<style lang="scss">
.container{
    height:70vh;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
}

</style>
