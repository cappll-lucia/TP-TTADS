<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import InputCustom, { type Form } from '$lib/components/InputCustom.svelte';
	import { enhance } from '$app/forms';
	import { mapErrorToForm, parseFormData } from '$lib/utils.js';
	import type { PageData } from './$types.js';
	import { provinceCreateSchema, provinceEditSchema } from './provinceSchema.js';

	export let form;

	export let data: PageData;
	const formStore = writable(form as Form);
	$: formStore.set(form as Form);

	const failed = derived(formStore, (x) => Boolean(x?.errors));

	let dialog: HTMLDialogElement;
	let edit_dialog: HTMLDialogElement;
	let focused_province = {
		id: '',
		name: ''
	};

	let loading = false;
	function openAddCityModal() {
		formStore.set(null);
		dialog.showModal();
	}
</script>

<button on:click={openAddCityModal}>New province</button>
<dialog
	bind:this={dialog}
	open={$failed}
>
	<form
		method="post"
		use:enhance={({ formData }) => {
			const res = parseFormData(formData, provinceCreateSchema);
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
			<button
				aria-busy={loading}
				formaction="?/add_province"
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
			</tr>
			{#each data.provinces as prov}
				<tr>
					<td>{prov.name}</td>
					<td
						><button
							on:click={() => {
								console.log(prov);
								focused_province = prov;
								edit_dialog.showModal();
							}}>Edit</button
						></td
					>
				</tr>
			{/each}
		</table>
	</article>
</main>

<dialog
	bind:this={edit_dialog}
	open={$failed}
>
	<form
		on:reset|preventDefault
		method="post"
		use:enhance={({ formData }) => {
			console.log(formData);
			const res = parseFormData(formData, provinceEditSchema);
			console.log(res);
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
				console.log(result);
				if (result.type == 'success') {
					edit_dialog.close();
				}
				update();
			};
		}}
	>
		<input
			hidden
			name="id"
			value={focused_province.id}
		/>
		<article>
			<InputCustom
				{formStore}
				default_value={focused_province.name}
				name="name"
				type="text"
				placeholder="Name"
			/>
			<button
				aria-busy={loading}
				formaction="?/edit_province"
				type="submit">Edit</button
			>
		</article>
	</form>
</dialog>

<style>
	article {
		width: 60vw;
	}
</style>
