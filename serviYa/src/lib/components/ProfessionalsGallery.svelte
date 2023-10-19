<script lang="ts">
	export let professionalList: any; // todo - cambiar por el tipo correcto
	const handleClick = (event: Event) => {
		const target = event?.target as HTMLElement;
		if (target) {
			target.setAttribute('aria-busy', 'true');
			target.innerText = 'Cargando...';
		}
	};
</script>

{#each professionalList as { id, name, profession, rating }}
	<article>
		<div class="grid">
			<p hidden>{id}</p>
			<p><strong>{name}</strong></p>
			<p>{profession}</p>
			<p>Rating: {rating} <i class="mi-favorite" /></p>
			<a
				on:click|once={(e) => {
					handleClick(e);
				}}
				aria-busy="false"
				href="/profile/{id}"
				role="button"
			>
				{'>Ver perfil'}
			</a>
		</div>
	</article>
{/each}
