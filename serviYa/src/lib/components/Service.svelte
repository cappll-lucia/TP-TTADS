<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "../../routes/$types";
    import RingLoader from 'svelte-loading-spinners/RingLoader.svelte';

$: loading=false;
export let data;
const {name, id} = data;
const img= data.img || `https://picsum.photos/id/${Math.trunc(Math.random()*200)+1}/300/300`;
</script>

<div class="card">
      
    <div class="img" style="background-image:url({img})">
    <div class="title">
        <h3>{name}</h3>
    </div>
    </div>
  <div class="actions">
        <a role="button"href="/admin/service/{id}">Modificar</a>
        <form use:enhance={()=>{
            loading=true;
            return async({result, update})=>{
                update();
                loading=false;
            }}} action="?/delete_service&id={id}" method="POST">
            <button type="submit" class=" secondary">Eliminar </button>
        </form>
    </div>
</div>
{#if loading}
<div class="overlay"></div>
	<div class="spinner">
		<RingLoader size="100" color="#FF3E00" unit="px" duration="2s" />
	</div>
{/if}
<style lang="scss">
    .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 5;
    }

    .spinner {
        z-index: 10;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
    .title{
        text-align: center;
        h3{
            color:white;
        }
    }
    .actions{
        margin: 10px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
            height: 3rem;
        }
        form{
            margin: 0;
            height: 3rem;
        }
    }
    .card{
        box-shadow: 2px 2px 2px gainsboro;
        margin:10px;
        border-radius: 5px;
        width: 300px;
    }
    .img{
        border-radius: 4px;
        height: 200px;
        width: 100%;
    }
</style>