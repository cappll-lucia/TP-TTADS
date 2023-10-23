<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getLocations, getProvinces } from '../../data/location_data';
	import type { Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';
	import AutocompleteCity from './../../lib/components/AutocompleteCity.svelte';
	import { enhance } from '$app/forms';

	//variables
	let selectedLocation = { id: '0', name: 'Localidad', province: 'idk' };
	export let data: PageData;
	const services = data.services as any[];
	export let form: ActionData;

	let loading = false;

	if (browser && form) {
		alert(form.body.message);
	}
</script>

<div class="container become_prof_page">
	<a href="/"><i class="mi mi-arrow-left" /> Volver al menú</a>
	<hgroup>
		<h3 transition:fly={{ y: 200, duration: 300 }}>
			¡Únete a ServiYa y forma parte de la revolución en servicios!
		</h3>
		<h3 transition:fly={{ y: 200, duration: 300 }}>¡Tu talento, nuestra comunidad!</h3>
	</hgroup>
	<div class="form_profesional">
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return ({ update }) => {
					loading = false;
					update();
				};
			}}
		>
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
				required
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
				name="city_id"
			/>
			<AutocompleteCity bind:value={selectedLocation} />
			<br />
			<hgroup>
				<h1><strong>Dias que trabajas</strong></h1>
			</hgroup>
			<table role="grid">
				<thead>
					<tr>
						<th>Lunes</th>
						<th>Martes</th>
						<th>Miércoles</th>
						<th>Jueves</th>
						<th>Viernes</th>
						<th>Sábado</th>
						<th>Domingo</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
						<th><input type="checkbox" /></th>
					</tr>
				</tbody>
			</table>

			{#if selectedLocation.id != '0'}
				<button
					type="submit"
					transition:fly={{ y: 200, duration: 300 }}
					class="become_prof_btn"
					aria-busy={loading}
					>Registrarse
				</button>
			{/if}
		</form>
	</div>
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
	tbody tr th {
		text-align: center; /* Center-align text within cells */
		padding: 8px; /* Optional padding for cells */
	}
</style>
