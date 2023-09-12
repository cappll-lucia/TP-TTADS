<script lang="ts">
	import type { ActionData, PageData } from "./$types";
    import Service from "$lib/components/Service.svelte";
	import { enhance } from "$app/forms";
	import { fade } from "svelte/transition";
	import { redirect } from "@sveltejs/kit";
    export let data : PageData;
    $: ({ service } = data);

</script>

<div  class="actions">
<a href="/admin/services"  role="button"> Nuevo Servicio</a>    
</div>

<div class="service_form" >
        <hgroup>
        <h1>{service?.name}</h1>
      </hgroup>
        <form method="POST" use:enhance={()=>{
            return async ({ result, update }) => {
               if(result.type==="success"){
                   window.location.href="/admin/service";
                   alert("Servicio modificado correctamente")
                }
        };
        }}> <input type="hidden" name="id" value="{service?.id}">
            <input type="text" value={service?.name} name="name" required>
            <input type="text" name="img" value={service?.img}>
            <button type="submit">Modificar</button>
            <a href="/admin/service" role="button" class="contrast">Salir</a>    
        </form>
</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
       



  <style lang="scss">

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
        .container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .hidden{
            display: none;
        }
        </style>