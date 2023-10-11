<script lang="ts">
	import { enhance } from '$app/forms';
	import { editmeSchema } from './editmeSchema';
	import type { ActionData } from './$types';
	import { ZodError } from 'zod';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { writable } from 'svelte/store';
    import {goto} from '$app/navigation';
	export let form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;

	export let data: PageData;
	const user = {
		name: data?.user?.name,
		email: data?.user?.email
	};

	const validateOrThrow = (formData: FormData) => {
		const obj = {} as any;
		+formData.forEach((v: any, k: any) => (obj[k] = v));
		editmeSchema.parse(obj);
	};

	const manageError = (error: any) => {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as ActionData;
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
						validateOrThrow(formData);
						loading = true;
						return async({ update }) => {
							loading = false;
                            await goto('/');
							update();
						};
					} catch (error) {
						manageError(error);
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
						class="btn btn-primary"
						disabled={loading}
					>
						<span>Guardar Cambios</span>
					</button>
				</div>
			</form>
		</div>
	</article>
</main>

<style lang="scss">
    .register-form{
        width: 50%
    }
    .input-tag{
        color: #34393b;
        font-size: 0.8rem;
    }   

    @media (max-width: 1000px) {
        .register-form{
            width: 70%
        }
    }
    @media (max-width: 756px) {
        .register-form{
            width: 100%
        }
    }
</style>
