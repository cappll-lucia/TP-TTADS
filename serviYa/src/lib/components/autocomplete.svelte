<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import type { City } from "../../types";

  let cities=[] as City[]
  const city=getContext<Writable<City|null>>("city") 
  let hasBeenJustFound=false

  function select(selectedCity:City){
    city.set(selectedCity)
    hasBeenJustFound=true
    searchTerm=$city?.nombre ?? ""
    cities=[]
  }

  let searchTerm=""
  $: {
    if(searchTerm.length>3 && !hasBeenJustFound){
      const url=`https://apis.datos.gob.ar/georef/api/municipios?nombre=${searchTerm}&campos=nombre&max=20`
      fetch(url)
        .then(rawRes=>rawRes.json())
        .then(data=>{cities=data.municipios})
        .catch(err=>console.error(err))
    }
    else{
      hasBeenJustFound=false
    }
  }


</script>


<input bind:value={searchTerm}>
<ul>
  {#each cities as c }
   <li on:click={()=>select(c)}>{c.nombre}</li> 
  {/each}

</ul>


<style>
  ul{
    width: 30%;
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
