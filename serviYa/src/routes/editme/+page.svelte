<script lang="ts">
	import { enhance } from '$app/forms';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import type { ActionData } from '../$types';
	import { ZodError } from 'zod';
	import { writable } from 'svelte/store';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { editmeSchema } from './editmeSchema';
	import type { Form } from '$lib/components/types';

	export let form: Form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;

	export let data: PageData;
	const user = {
		name: data?.user?.name,
		email: data?.user?.email
	};

	const validate_or_throw = (FormData: FormData) => {
		const obj = {} as any;
		+FormData.forEach((v: any, k: any) => (obj[k] = v));
		editmeSchema.parse(obj);
	};

	const manage_error = (error: any) => {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as any;
		}
	};
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
					{#if form?.message}
						<span class="error">{form?.message}</span>
					{/if}
				</div>
				<div class="actions">
					<button
						type="submit"
						class="submit-btn"
						typeof="submit"
						aria-busy={loading}>Register</button
					>
				</div>
			</form>
		</div>
	</article>
</main>
