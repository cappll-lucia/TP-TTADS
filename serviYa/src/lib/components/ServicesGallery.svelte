<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { City } from '../../types';

	export let data: any;

	const city = getContext('city') as Writable<City | null>;
</script>

{#if $city}
	<div
		class="container services_gallery services_gallery_{data.length} col-lg-8 col-md-10 col-sm-12 col-12"
	>
		{#each data as s}
			<div class=" services_gallery--serv">
				<a href="/services/{s.name}?city={$city.id}">{s.name}</a>
			</div>
		{/each}
	</div>
{:else}
	<p>Por favor elija una ciudad</p>
{/if}

<style lang="scss">
	.services_gallery {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 5px;
		.services_gallery--serv {
			background-color: #1e88e5;
			height: 150px;
			min-width: calc(33.33% - 50px);
			display: flex;
			border-radius: 20px;
			margin: 5px;
			justify-content: center;
			align-items: center;
			a {
				font-size: 1rem;
				font-weight: 600;
				color: #000;
			}
		}
	}

	@media (max-width: 600px) {
		.services_gallery {
			gap: 3px;
			.services_gallery--serv {
				min-width: calc(33.33% - 10px);
				border-radius: 20px;
			}
		}
	}
</style>
