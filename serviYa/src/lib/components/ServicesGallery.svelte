<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { City } from '../../types';
	import { fade } from 'svelte/transition';

	export let data: any;

	const city = getContext('city') as Writable<City | null>;
</script>

{#if $city}
	<div class="container">
		{#each data as s}
			<article class="service">
				<a href="/services/{s.name}?city={$city.id}">{s.name}</a>
			</article>
		{/each}
	</div>
{:else}
	<p>Por favor elija una ciudad</p>
{/if}

<style lang="scss">
	.container {
		padding-left: 4rem;
		padding-right: 4rem;
		display: flex;
		justify-items: center;
		align-items: center;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: calc(12%);
	}
	.service {
		flex: 0 0 calc(36%); /* Adjust as needed */
		display: flex;
		justify-items: center;
		align-items: center;
		align-content: center;
		justify-content: center;
		text-align: center;

		height: 120px;
		font-size: 1.4rem;
		transition: all 0.35s ease-in-out;
	}

	.service a:hover {
		cursor: pointer;
	}
	.service:hover {
		border-radius: 10px;
		background: linear-gradient(120deg, var(--secondary), var(--secondary-focus));
		font-size: 1.5rem;
		width: 260px;
	}
</style>
