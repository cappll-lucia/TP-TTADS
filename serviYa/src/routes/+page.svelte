<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import ServicesGallery from '$lib/components/ServicesGallery.svelte';
	import type { PageData } from './$types';
	import type { Province, Location } from '../types';

	import { getProvinces, getLocations } from '../data/location_data';
	import { fade, fly } from 'svelte/transition';
	import type { Writable } from 'svelte/store';

	export let data: PageData;

	let provinces: Province[] = [];
	let locations: Location[] = [];
	let selectedProvince: Province = { id: '0', nombre: 'Provincia' };
	let selectedLocation: Location = { id: '0', nombre: 'Localidad' };

	onMount(() => {
		loadProvinces();
	});

	const loadProvinces = async () => {
		try {
			const jsonResp = await getProvinces();
			provinces = [...jsonResp.provincias];
			provinces.unshift(selectedProvince);
			selectedProvince = provinces[0];
		} catch (error) {}
	};

	const loadLocations = async () => {
		try {
			if (selectedProvince.id != '0') {
				const jsonResp = await getLocations(selectedProvince.id);
				locations = [...jsonResp.localidades];
				locations.unshift(selectedLocation);
				selectedLocation = locations[0];
			}
		} catch (error) {}
	};

	const city = getContext<Writable<Location | null>>('city');
</script>

{#if data.user}
	{#if data.user.role === 'ADMIN'}
		<a
			href="/admin"
			role="button">Ir a Dashboard</a
		>
	{:else}
		<ServicesGallery data={data.services} />
	{/if}
{:else}
	<div class="landing">
		<div class="content">
			<div class="txt t-center">
				<h1>ServiYa: Tu conexión con profesionales de excelencia</h1>
				<span
					>Encuentra plomeros, gasistas, cerrajeros, mecánicos, docentes particulares y más,
					verificados y listos para ofrecerte sus servicios en tu localidad.
				</span>
			</div>
			<div class="input my-2">
				<span transition:fly={{ y: 200, duration: 300 }}>Explora expertos en tu zona</span>
				<select
					bind:value={selectedProvince}
					on:change={loadLocations}
				>
					{#each provinces as prov (prov.id)}
						<option
							value={prov}
							selected>{prov.nombre.toLocaleUpperCase()}</option
						>
					{/each}
				</select>
				{#if selectedProvince.id != '0'}
					<select
						bind:value={selectedLocation}
						transition:fade
					>
						{#each locations as loc}
							<option
								value={loc}
								selected>{loc.nombre.toLocaleUpperCase()}</option
							>
						{/each}
					</select>
				{/if}
				{#if selectedLocation.id != '0'}
					<button
						transition:fly={{ y: 200, duration: 300 }}
						class="searchByLocation-btn"
						><a
							href={`/locationSearch/${selectedProvince.id}/${selectedLocation.id}`}
							class="unlink">BUSCAR PROFESIONAL</a
						></button
					>
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
		background-image: url('/ai.profLsc2.png');
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
				font-size: 1.2rem;
				text-align: center;
				display: inline-block;
				width: 70%;
				position: relative;
				left: 15%;
			}
			.txt h1 {
				color: #f6f6f6;
				--typography-spacing-vertical: 0;
				text-align: center;
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

	.searchByLocation-btn {
		background-color: #1095c1;
		.unlink {
			text-decoration: none;
			color: #f6f6f6;
		}
	}
</style>
