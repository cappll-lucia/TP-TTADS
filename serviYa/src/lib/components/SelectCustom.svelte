<script lang="ts">
	import { derived, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import type { Form } from './types';

	export let formStore: Writable<Form>;
	export let name: string;
	export let options: string[];
	export let defaultMessage = 'select...';

	const hasError = derived(formStore, (form) => Boolean(form && form.errors && form.errors[name]));
	const error = derived(formStore, (form) =>
		form && form.errors && form.errors[name] ? form.errors[name] : ''
	);
</script>

<select
	{name}
	aria-label={name}
	class={$hasError ? 'input-error' : 'input'}
>
	<option
		selected
		disabled>{defaultMessage}</option
	>
	{#each options as opt}
		<option value={opt}>{opt}</option>
	{/each}
</select>
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
