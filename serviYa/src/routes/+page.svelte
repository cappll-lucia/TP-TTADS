<script lang="ts">
  import Img from "$lib/components/Img.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import type { Province, Location } from "../types";
  import { json, redirect } from "@sveltejs/kit";
  import { fade, fly } from "svelte/transition";
  import { images } from "../data/random_data.js";

  export let data: PageData;
  let provinces: Province[] = [];
  let locations: Location[] = [];
  let selectedProvince: Province = { id: "0", nombre: "Provincia" };
  let selectedLocation: Location = { id: "0", nombre: "Localidad" };
  onMount(() => {
    getProvinces();
  });

  const getProvinces = async () => {
    try {
      const response = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias?campos=nombre"
      );
      const jsonResponse = await response.json();
      provinces = [...jsonResponse.provincias];
      provinces.unshift(selectedProvince);
      selectedProvince = provinces[0];
    } catch (error) {}
  };
  const getLocations = async () => {
    try {
      if (selectedProvince.id != "0") {
        const response = await fetch(
          `https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince.id}&campos=nombre&max=500`
        );
        const jsonResponse = await response.json();
        locations = [...jsonResponse.localidades];
        locations.unshift(selectedLocation);
        selectedLocation = locations[0];
      }
    } catch (error) {}
  };

  const searchProfessionalsAtLocation = () => {
    console.log(selectedLocation.id);
  };
</script>

{#if data.user}
  <div class="grid my-3">
    {#each images as i (i.img_id)}
      <div>
        <a href="/description/{i.img_id}">
          <Img imgData={i} />
        </a>
      </div>
    {/each}
  </div>
{:else}
  <div class="landing">
    <div class="content">
      <div class="txt t-center">
        <h1>Lorem ipsum dolor.</h1>
        <span>Lorem ipsum, dolor sit amet consectetur adipisicing.</span>
      </div>
      <div class="input my-2">
        <span>Lorem ipsum dolor sit amet consectetur.</span>
        <select bind:value={selectedProvince} on:change={getLocations}>
          {#each provinces as prov (prov.id)}
            <option value={prov} selected
              >{prov.nombre.toLocaleUpperCase()}</option
            >
          {/each}
        </select>
        {#if selectedProvince.id != "0"}
          <select
            bind:value={selectedLocation}
            on:change={searchProfessionalsAtLocation}
            transition:fade
          >
            {#each locations as loc}
              <option value={loc} selected
                >{loc.nombre.toLocaleUpperCase()}</option
              >
            {/each}
          </select>
        {/if}
        {#if selectedLocation.id != "0"}
          <button><a href={`/locationSearch/`}>Buscar Profesional</a></button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  /* .my-3 {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }*/
  .my-2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  /*
    .grid {
      text-align: center;
     grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 1rem;
      grid-row-gap: 1rem; 
    }
    .t-center {
      text-align: center;
    } */

  .landing {
    background-image: url("/ai.profLsc2.png");
    background-position: top;
    backdrop-filter: blur(10px);
    height: calc(100vh - 60px);
    background-size: cover;
    .content {
      /* background-color: rgba(138, 137, 137, 0.459);  */
      background-color: rgba(85, 85, 129, 0.705);
      backdrop-filter: blur(8px);
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #f6f6f6;
      .txt span {
        font-size: 1.3rem;
      }
      .txt h1 {
        color: #f6f6f6;
        --typography-spacing-vertical: 0;
      }
      .input {
        width: 30rem;
        height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: 1.1rem;
        select {
          border: 2.5px solid #f6f6f6;
          color: #f6f6f6;
          option {
            color: #191919;
          }
        }
      }
    }
  }
</style>
