<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import type { City } from "../../types";
    import { capitalize } from "$lib/utils";
    import { fade, slide } from "svelte/transition";

  let cities=[] as City[]
  const city=getContext<Writable<City|null>>("city") 
  let hasBeenJustFound=false
  


  function showCityDescription(x:City| null){
     return x? capitalize(x.nombre)+', '+capitalize(x.provincia.nombre):"" 
  }

  function select(selectedCity:City){
    city.set(selectedCity)
    hasBeenJustFound=true
    searchTerm=showCityDescription($city) ?? ""
    console.log("dede")
    cities=[]
  }

  let searchTerm=""
  $: {
    if(searchTerm==""){
      cities=[]
    }
    if(searchTerm.length>3 && !hasBeenJustFound){
      const url=`https://apis.datos.gob.ar/georef/api/localidades?nombre=${searchTerm}&max=10`
      fetch(url)
        .then(rawRes=>rawRes.json())
        .then(data=>{
          cities=data.localidades
        })
        .catch(err=>console.error(err))
    }
    else{
      hasBeenJustFound=false
    }
  }


</script>

<input bind:value={searchTerm}> 
{#if cities.length!==0}
<ul transition:slide={{duration:300}} on:blur={()=>cities=[]}>
  {#each cities as c }
   <li on:click={()=>select(c)}>{showCityDescription(c)}</li> 
  {/each}
</ul>
{/if}


<style>
  ul{
    width: 17rem;
    display: flex;
    flex-direction: column;
    background: black;
    position: absolute;
  }
  li{
    width: 100%;
  }

  li:hover{
    background: #999;
      
  }

</style>
