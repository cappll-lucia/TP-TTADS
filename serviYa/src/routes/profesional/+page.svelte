<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getLocations, getProvinces } from '../../data/location_data';
	import type { Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';
	import AutocompleteCity from './../../lib/components/AutocompleteCity.svelte';

	//variables
	let selectedLocation = { id: '0', name: 'Localidad', province: 'idk' };
	export let data: PageData;
	const services = data.services as any[];
	export let form: ActionData;

	if (browser && form) {
		alert(form.body.message);
	}
</script>

<div class="container become_prof_page">
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
			<input
				type="hidden"
				value={selectedLocation.id}
				name="location_id"
			/>
			<AutocompleteCity
				bind:value={selectedLocation}
				class_name="from_form"
			/>
			{#if selectedLocation.id != '0'}
				<button
					type="submit"
					transition:fly={{ y: 200, duration: 300 }}
					class="become_prof_btn"
					>Registrarse
				</button>
			{/if}
		</form>
	</div>
	<a href="/"><i class="mi mi-arrow-left"/>Volver al menú</a>
</div>

<style lang="scss">
	hgroup {
		text-align: center;
	}
	.become_prof_page {
		padding: 2rem 0;
	}
	.form_profesional {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: space-between;
		form {
			width: 70%;
			textarea {
				resize: none;
			}
		}
		.become_prof_btn {
			margin-top: 2rem;
		}
	}
</style>
