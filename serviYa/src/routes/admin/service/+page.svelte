<script lang="ts">
	import type { ActionData, PageData } from "./$types";
    import Service from "$lib/components/Service.svelte";
    export  let form : ActionData;


    export let data : PageData;
    $: ({ _services } = data);
  //  
</script>

<div class="actions">
<a href="./new" role="button"> Nuevo Servicio</a>    
</div>
<div class="container">

    {#each _services as s (s.id)}
    <Service  data={s}/>
    {/each}
</div>
  
  <style lang="scss">

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
        </style>