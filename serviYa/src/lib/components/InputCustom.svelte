<script
	lang="ts"
	context="module"
>
	export type Form =
		| {
				data: { [x: string]: string };
				errors: {
					[x: string]: string[] | undefined;
					[x: number]: string[] | undefined;
					[x: symbol]: string[] | undefined;
				};
				message?: undefined;
		  }
		| { message: string; data?: undefined; errors?: undefined }
		| null;
</script>

<script lang="ts">
	import { derived, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	export let formStore: Writable<Form>;
	export let name: string;
	export let type: 'text' | 'password' | 'email';
	export let placeholder: string;

	const hasError = derived(formStore, (form) => Boolean(form && form.errors && form.errors[name]));
	const value = derived(formStore, (form) => (form && form.data ? form.data[name] : ''));
	const error = derived(formStore, (form) =>
		form && form.errors && form.errors[name] ? form.errors[name] : ''
	);
</script>

<input
	{name}
	{type}
	{placeholder}
	aria-label={name}
	class={$hasError ? 'input-error' : 'input'}
	value={$value}
/>
{#if $hasError}
	<span
		in:fly={{ y: -30, x: -2 }}
		class="error">{$error}</span
	>
{/if}

<style>
	.error {
		font-size: medium;
		color: red;
		position: relative;
		display: inline-block;
		height: 2rem;
		margin: 0;
	}

	.input-error {
		--spacing: 0;
		border: red solid 2px;
		margin-bottom: 0rem;
	}
</style>
