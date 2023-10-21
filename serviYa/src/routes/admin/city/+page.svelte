<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { enhance } from '$app/forms';
	import { mapErrorToForm, parseFormData } from '$lib/utils.js';
	import { cityCreateSchema, cityModifySchema } from './citySchema.js';
	import type { PageData } from './$types.js';
	import SelectCustom from '$lib/components/SelectCustom.svelte';
	import type { Form } from '$lib/components/types.js';
	import type { City } from '@prisma/client';

	export let form;

	export let data: PageData;
	const formStore = writable(form as Form);
	$: formStore.set(form as Form);
	const failed = derived(formStore, (x) => Boolean(x?.errors));

	let create_city_dialog: HTMLDialogElement;
	let create_city_form: HTMLFormElement;
	let modify_city_dialog: HTMLDialogElement;
	let modify_city_form: HTMLFormElement;
	let focused_city: City = {
		id: '',
		name: '',
		province: ''
	};

	let loading = false;
	function openAddCityModal() {
		formStore.set(null);
		create_city_dialog.showModal();
	}

	function openModifyCityModal(modified_city: City) {
		focused_city = modified_city;
		modify_city_dialog.showModal();
	}
</script>

<button on:click={openAddCityModal}>New city</button>

<!-- Create city dialog -->
<dialog
	bind:this={create_city_dialog}
	open={$failed}
>
	<form
		bind:this={create_city_form}
		method="post"
		on:reset|preventDefault
		use:enhance={({ formData }) => {
			const res = parseFormData(formData, cityCreateSchema);
			if (!res.success) {
				mapErrorToForm(formStore, res);
				return ({ update }) => {
					update();
				};
			}
			loading = true;
			return ({ update, result }) => {
				formStore.set(null);
				loading = false;
				if (result.type == 'success') {
					create_city_form.reset();
					create_city_dialog.close();
				}
				update();
			};
		}}
	>
		<article>
			<InputCustom
				{formStore}
				name="name"
				type="text"
				placeholder="Name"
			/>
			<SelectCustom
				{formStore}
				name="province"
				options={data.allowedProvinces.map((x) => x.name)}
			/>
			<button
				aria-busy={loading}
				formaction="?/add_city"
				type="submit">Create</button
			>
		</article>
	</form>
</dialog>

<!-- Modify city dialog -->
<dialog bind:this={modify_city_dialog}>
	<form
		bind:this={modify_city_form}
		method="post"
		on:reset|preventDefault
		use:enhance={({ formData }) => {
			const res = parseFormData(formData, cityModifySchema);
			if (!res.success) {
				mapErrorToForm(formStore, res);
				return ({ update }) => {
					update();
				};
			}
			loading = true;
			return ({ update, result }) => {
				formStore.set(null);
				loading = false;
				if (result.type == 'success') {
					modify_city_form.reset();
					modify_city_dialog.close();
				}
				update();
			};
		}}
	>
		<article>
			<input
				hidden
				name="id"
				value={focused_city.id}
			/>
			<input
				type="text"
				name="name"
				value={focused_city.name}
				required
			/>
			<select
				name="province"
				value={focused_city.province}
				required
			>
				{#each data.allowedProvinces as province}
					<option value={province.name}>{province.name}</option>
				{/each}
			</select>

			<button
				aria-busy={loading}
				formaction="?/modify_city"
				type="submit">Modificar</button
			>
		</article>
	</form>
</dialog>

<main class="container">
	<article>
		<table>
			<tr>
				<th>Name</th>
				<th>Province</th>
			</tr>
			{#each data.cities as city}
				<tr>
					<td>{city.name}</td>
					<td>{city.province}</td>
					<td>
						<button on:click={() => openModifyCityModal(city)}> Edit </button>
					</td>
				</tr>
			{/each}
		</table>
	</article>
</main>

<style>
	article {
		width: 80vh;
	}
</style>
