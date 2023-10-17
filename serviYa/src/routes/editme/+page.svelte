<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import type { ActionData } from '../$types';
	import { ZodError } from 'zod';
	import { writable } from 'svelte/store';
	import type { PageData } from '../$types';
	import { goto, invalidateAll } from '$app/navigation';
	import { editmeSchema } from './editmeSchema';
	import type { Form } from '$lib/components/types';
	import AutocompleteCity from '$lib/components/AutocompleteCity.svelte';

	export let form: Form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;

	export let data: PageData;
	const user = {
		name: data?.user?.name,
		email: data?.user?.email
	};

	let current_city = {
		id: data?.city?.id || '0',
		name: data?.city?.name || 'Localidad',
		province: data?.city?.province || 'idk'
	};

	const validate_or_throw = (formData: FormData) => {
		const obj = {} as any;
		formData.forEach((v: any, k: any) => (obj[k] = v));
		editmeSchema.parse(obj);
	};

	const manage_error = (error: any) => {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as any;
		}
	};

	$: {
	}
</script>

<main class="container">
	<article class="grid">
		<div class="form-panel">
			<hgroup>
				<h1>Editar Usuario</h1>
			</hgroup>
			<form
				method="POST"
				class="register-form"
				use:enhance={({ formData }) => {
					try {
						validate_or_throw(formData);
						loading = true;
						return async ({ update }) => {
							loading = false;
							await goto('/');
							update();
						};
					} catch (error) {
						manage_error(error);
					}
				}}
			>
				<div class="inputs">
					<span class="input-tag">Email</span>
					<label for="email">{user.email}</label>
					<span class="input-tag">Nombre</span>
					<InputCustom
						{formStore}
						default_value={user.name}
						name="name"
						type="text"
					/>
					<AutocompleteCity bind:value={current_city} />
					<input
						name="city_id"
						value={current_city.id}
						hidden
					/>
					{#if form?.errors?.city_id}
						<span class="error">{form?.errors?.city_id}</span>
					{/if}
				</div>
				<div class="actions">
					<button
						type="submit"
						class="submit-btn"
						typeof="submit"
						aria-busy={loading}>Editar</button
					>
				</div>
			</form>
		</div>
	</article>
</main>

<style>
	.error {
		font-size: medium;
		color: red;
		position: relative;
		display: inline-block;
		height: 2rem;
		margin: 0;
	}
	.submit-btn {
		margin-top: 2rem;
	}
</style>
