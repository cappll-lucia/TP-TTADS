<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getLocations, getProvinces } from '../../data/location_data';
	import type { Province, Location } from '../../types';
	import type { Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	//variables
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

<div class="container">
	<hgroup>
		<h3 transition:fly={{ y: 200, duration: 300 }}>
			¡Únete a ServiYa y forma parte de la revolución en servicios!
		</h3>
		<h3 transition:fly={{ y: 200, duration: 300 }}>¡Tu talento, nuestra comunidad!</h3>
	</hgroup>
	<div class="form_profesional">
		<form method="POST">
			<input
				type="text"
				name="phone"
				placeholder="Celular"
				required
			/>

			<textarea
				name="description"
				placeholder="Descripción"
				required
			/>
			<select
				name="province"
				id="province"
				on:change={loadLocations}
				bind:value={selectedProvince}
			>
				{#each provinces as province (province.id)}
					<option value={province}>{province.nombre.toUpperCase()}</option>
				{/each}
			</select>
			{#if selectedProvince.id != '0'}
				<select
					name="location"
					id="location"
					bind:value={selectedLocation}
					transition:fade
				>
					{#each locations as location (location.id)}
						<option value={location}>{location.nombre.toUpperCase()}</option>
					{/each}
				</select>
			{/if}
			{#if selectedLocation.id != '0'}
				<button
					transition:fly={{ y: 200, duration: 300 }}
					class="searchByLocation-btn">Registrarse</button
				>
			{/if}
		</form>
	</div>
	<a href="/">Volver al menu</a>
</div>

<style lang="scss">
	hgroup {
		text-align: center;
	}
</style>
