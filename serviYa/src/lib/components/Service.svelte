<script lang="ts">

export let data;
const {name, id, img} = data;
</script>

<div style="background-image:url({img})" class="card">
    <div class="title">
        <h3>{name}</h3>
    </div>
    <div  class="actions">
        <a href="/{id}">Modificar</a>
        <form action="?/deleteService&id={id}" method="POST">
            <button type="submit" class="outline secondary">Eliminar </button>
        </form>
    </div>
</div>

<style lang="scss">
    
    .card{
        box-shadow: 2px 2px 2px gainsboro;
        padding: 5px;
        margin:10px;
        border-radius: 5px;
        width: 300px;
    }
</style>