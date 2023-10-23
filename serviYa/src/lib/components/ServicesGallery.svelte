<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { City } from '../../types';

	export let data: any;
	const getColorIndex = () => Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	data.forEach((x: any) => (x.color = getColorIndex()));
	const city = getContext('city') as Writable<City | null>;
</script>

{#if $city}
	<div
		class="container services_gallery services_gallery_{data.length} col-lg-8 col-md-10 col-sm-12 col-12"
	>
		{#each data as s}
			<div class="services_gallery--servColor{s.color} services_gallery--serv">
				<a href="/services/{s.name}?city={$city.id}">{s.name}</a>
			</div>
		{/each}
	</div>
{:else}
	<p>Por favor elija una ciudad</p>
{/if}

<style lang="scss">
	.services_gallery {
		height: auto;
		display: flex;
		justify-content: space-arround;
		align-items: center;
		flex-wrap: wrap;
		gap: 5px;
		.services_gallery--serv {
			height: 150px;
			display: flex;
			flex: 1;
			min-width: calc(33.33% - 50px);
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

	.services_gallery--servColor1 {
		background-color: #06ff00;
	}
	.services_gallery--servColor2 {
		background-color: #ffe400;
	}
	.services_gallery--servColor3 {
		background-color: #ff8e00;
	}
	.services_gallery--servColor4 {
		background-color: #ff1700;
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
