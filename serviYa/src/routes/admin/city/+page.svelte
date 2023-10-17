<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { enhance } from '$app/forms';
	import { mapErrorToForm, parseFormData } from '$lib/utils.js';
	import { cityCreateSchema } from './citySchema.js';
	import type { PageData } from './$types.js';
	import SelectCustom from '$lib/components/SelectCustom.svelte';
	import type { Form } from '$lib/components/types.js';

	export let form;

	export let data: PageData;
	const formStore = writable(form as Form);
	$: formStore.set(form as Form);
	const failed = derived(formStore, (x) => Boolean(x?.errors));

	let dialog: HTMLDialogElement;
	let createForm: HTMLFormElement;

	let loading = false;
	function openAddCityModal() {
		formStore.set(null);
		dialog.showModal();
	}
</script>

<button on:click={openAddCityModal}>New city</button>
<dialog
	bind:this={dialog}
	open={$failed}
>
	<form
		bind:this={createForm}
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
					createForm.reset();
					dialog.close();
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
