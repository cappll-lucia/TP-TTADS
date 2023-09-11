<script lang="ts">
	import type { ActionData, PageData } from "./$types";
    import Service from "$lib/components/Service.svelte";
	import { enhance } from "$app/forms";
	import { fade } from "svelte/transition";

    $: hide_form =true;
    export let data : PageData;
    $: ({ _services } = data);
  // 
</script>

<div  class="actions">
<a href="/#" on:click|preventDefault={()=>{
    hide_form = !hide_form;
}} role="button"> Nuevo Servicio</a>    
</div>
<div class="container">

    {#each _services as s (s.id)}
    <Service  data={s}/>
    {/each}
</div>
{#if !hide_form }
<div transition:fade={{duration:200}} class="service_form" class:hidden={hide_form}>
        <hgroup>
        <h1>Nuevo servicio</h1>
      </hgroup>
        <form action="?/add_service" method="POST" use:enhance={()=>{
            return async ({ result, update }) => {
               if(result.type==="success"){
                   update();
                   alert("Servicio agregado correctamente")
                   hide_form=true;
                }
        };
        }}>
            <input type="text" name="name" placeholder="Nombre del servicio" required>
            <input type="text" name="img" placeholder="URL de la imagen">
            <button type="submit">Agregar</button>
            <a on:click|preventDefault={()=>{
    hide_form = !hide_form;}} 
     href="/#" role="button" class="contrast">Salir</a>
        </form>
</div>{/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={()=>{
            hide_form = !hide_form;
        }} class:overlay={!hide_form} ></div>
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
    .service_form{
        padding:  2rem 6rem 6rem 6rem;
        border-radius: 5px;
        box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(213, 213, 213);
        hgroup{
            position: relative;
            top: 2px;
         h1{
            font-size: 2rem;
            color: white;
         }   
        }
        form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            input{
                margin: 10px;
                
                border-radius: 5px;
            }
            button,a{
                margin: 10px;
                border-radius: 5px;
                cursor: pointer;
                width: 250px;
            }
        }
    }
      table{
          max-width: 500px;
        tbody{
            tr{
                td:last-child{
                    a{
                        color: red;
                    }
                
                    
                }
            }
        }
        }
        .container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .hidden{
            display: none;
        }
        </style>