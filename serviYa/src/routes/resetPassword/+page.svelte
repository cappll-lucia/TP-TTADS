<script lang="ts">
	import type { ActionData } from '../$types';
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import { ZodError, z } from 'zod';
	import InputCustom from '$lib/components/InputCustom.svelte';

	export let form;
	const formStore = writable(form);
	$: formStore.set(form);

	export const prerender = true;
	let loading = false;
	let entering = false;

	const emailSchema = z.object({
		email: z
			.string({ required_error: 'Ingrese su email' })
			.email({ message: 'Ingrese un email válido' })
	});

	function validateOrThrow(formdata: FormData) {
		const obj = {} as any;
		formdata.forEach((v: any, k: any) => (obj[k] = v));
		emailSchema.parse(obj);
	}
	function manageError(error: any) {
		if (error instanceof ZodError) {
			const { fieldErrors } = error.flatten();
			form = { errors: fieldErrors } as ActionData;
		}
	}
</script>

<main class="container">
	<article class="grid">
		{#if !entering}
			<div>
				<hgroup>
					<h1>Reestablecer contraseña</h1>
					<p>
						Para restablecer su contraseña, ingrese su cuenta de ServiYa a continuación. Recibirá un
						correo electrónico con instrucciones sobre cómo completar el proceso.
					</p>
				</hgroup>
				<form
					on:reset|preventDefault
					method="POST"
					use:enhance={({ formData }) => {
						try {
							validateOrThrow(formData);
							loading = true;
							return ({ update, result }) => {
								entering = result.type === 'success';
								loading = false;
								update();
							};
						} catch (error) {
							manageError(error);
						}
					}}
				>
					<InputCustom
						{formStore}
						name="email"
						type="text"
						placeholder="Correo electrónico"
					/>
					{#if form?.message === 'AUTH_INVALID_SESSION_ID'}
						<span class="error"
							>No existe una cuenta de ServiYa con el correo electrónico ingresado</span
						>
					{/if}
					<button
						type="submit"
						class="contrast"
						typeof="submit"
						aria-busy={loading}
						disabled={entering}>Enviar Correo</button
					>
				</form>
			</div>
		{:else}
			<div>
				<hgroup>
					<h1>Correo enviado</h1>
					<p>
						Se ha enviado un correo electrónico a la dirección que proporcionó. Siga las
						instrucciones recibidas para restablecer su contraseña.
					</p>
				</hgroup>
			</div>
		{/if}
	</article>
</main>

<style lang="scss">
	.container {
		height: calc(100vh - 80px);
		width: 50%;
		.grid {
			margin-top: 60px;
			form {
				input {
					margin: 0;
				}
				.error {
					font-size: medium;
					color: red;
				}
				button {
					margin-top: 1rem;
				}
			}
		}
	}
	#login-img {
		background-image: url('../../ai.profClient.png');
		background-position: center;
		background-size: contain;
	}

	@media (max-width: 768px) {
		.container {
			width: 100%;
		}
	}
</style>
