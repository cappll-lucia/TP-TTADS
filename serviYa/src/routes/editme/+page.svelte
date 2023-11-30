<script lang="ts">
	import { enhance } from '$app/forms';
	import InputCustom from '$lib/components/InputCustom.svelte';
	import { ZodError } from 'zod';
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { editmeSchema } from './editmeSchema';
	import type { Form } from '$lib/components/types';
	import AutocompleteCity from '$lib/components/AutocompleteCity.svelte';
	import { getContext } from 'svelte';
	import type { City } from '../../types';

	export let form: Form;
	const formStore = writable(form);
	$: formStore.set(form);

	let loading = false;

	export let data: PageData;
	const user = {
		name: data?.user?.name,
		email: data?.user?.email
	};
	let fileinput;
	let avatar = data?.user?.url_photo;
	let city = getContext('city') as Writable<City>;
	let current_city = { ...$city };
	let valid_city = true;
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

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target?.result;
		};
	};
</script>

<main class="container mt-10">
	<article class="grid">
		<div>
			<h1 class="text-3xl">Editar Usuario</h1>
			<form
				method="POST"
				class="register-form"
				enctype="multipart/form-data"
				on:reset|preventDefault
				use:enhance={({ formData }) => {
					try {
						validate_or_throw(formData);
						loading = true;
						return async ({ update }) => {
							$city = current_city;
							loading = false;
							await goto('/');
							update();
						};
					} catch (error) {
						manage_error(error);
					}
				}}
			>
				<div class="form-panel flex flex-row gap-x-10">
					<div class="inputs w-1/2 mt-10">
						<span class="input-tag">Email</span>
						<InputCustom
							{formStore}
							default_value={user.email}
							name="email"
							type="text"
							disabled={true}
						/>
						<span class="input-tag">Nombre</span>
						<InputCustom
						{formStore}
						default_value={user.name}
						name="name"
						type="text"
						/>
						<span class="input-tag">Ciudad</span>
						<AutocompleteCity
							bind:value={current_city}
							on:invalid={() => (valid_city = false)}
							on:valid={() => (valid_city = true)}
						/>
						<input
							name="city_id"
							value={current_city.id}
							hidden
						/>
						{#if form?.errors?.city_id}
							<span class="error">{form?.errors?.city_id}</span>
						{/if}
					</div>

					<div class="w-1/2 flex flex-col">
						{#if avatar}
							<div class="md:w-1/2 h-2/3 md:mx-auto">
								<img
									src={avatar}
									id="img"
									class="h-full bg-center bg-no-repeat rounded-xl avatar"
									alt="avatar"
								/>
							</div>
						{:else}
							<div class=" h-2/3 p-3 md:p-0 md:mx-auto md:w-1/2">
								<div
									style="--img-url: url(https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person.png)"
									id="img"
									class="h-full bg-center bg-no-repeat rounded-xl avatar"
								/>
							</div>
						{/if}
						<div class="mx-auto">
							<div>
								<p class="text-sm text-gray-500">Accepted formats: .png, .jpg, .gif, .mp4</p>
							</div>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input
									style=""
									type="file"
									accept=".jpg, .jpeg, .png"
									on:change={(e) => onFileSelected(e)}
									bind:this={fileinput}
									name="file"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="actions">
					<button
						type="submit"
						class="submit-btn w-1/3 text-center mx-auto"
						typeof="submit"
						disabled={!valid_city}
						aria-busy={loading}>Editar</button
					>
				</div>
			</form>
		</div>
	</article>
</main>

<style lang="postcss">
	#img {
		background-image: var(--img-url);
		background-size: contain;
	}
	.avatar {
		max-width: 200px;
		max-height: 200px;
		border-radius: 50%;
	}
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

	.inputs{
		display: flex;
		flex-direction: column;	
	}
</style>
