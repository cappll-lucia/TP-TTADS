<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getLocations, getProvinces } from '../../data/location_data';
	import type { Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';

	//variables
	let provinces: any[] = [];
	let locations: any[] = [];
	let selectedProvince = { id: '0', nombre: 'Provincia' };
	let selectedLocation = { id: '0', nombre: 'Localidad' };
	export let data: PageData;
	const services = data.services as any[];
	export let form: ActionData;

	if (browser && form) {
		alert(form.body.message);
	}
	onMount(() => {
		loadProvinces();
	});

	const loadProvinces = async () => {
		try {
			const jsonResp = await getProvinces();
			provinces = [...jsonResp.provincias];
			provinces.unshift({ id: '0', nombre: 'Provincia' });
		} catch (error) {}
	};

	const loadLocations = (id: string) => {
		return async () => {
			try {
				if (id != '0') {
					selectedLocation = { id: '0', nombre: 'Localidad' };
					const jsonResp = await getLocations(id);
					locations = [...jsonResp.localidades];
					locations.unshift({ id: '0', nombre: 'Localidad' });
				}
			} catch (error) {}
		};
	};
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
				name="service_id"
				id="service"
			>
				<option
					disabled
					selected>Servicio</option
				>
				{#each services as service (service.id)}
					<option value={service.id}>{service.name.toUpperCase()}</option>
				{/each}
			</select>
			<select
				name="province_id"
				id="province"
				bind:value={selectedProvince.id}
				on:change={loadLocations(selectedProvince.id)}
			>
				{#each provinces as province (province.id)}
					<option
						selected
						value={province.id}>{province.nombre.toUpperCase()}</option
					>
				{/each}
			</select>
			{#if selectedProvince.id != '0'}
				<select
					name="location_id"
					id="location"
					bind:value={selectedLocation.id}
					transition:fade
				>
					{#each locations as location (location.id)}
						<option value={location.id}>{location.nombre.toUpperCase()}</option>
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
