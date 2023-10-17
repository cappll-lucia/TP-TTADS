<script lang="ts">
	export let professionalList: any; // todo - cambiar por el tipo correcto
</script>

{#each professionalList as { id, name, profession, rating }}
	<article>
		<div class="grid">
			<p hidden>{id}</p>
			<p><strong>{name}</strong></p>
			<p>{profession}</p>
			<p>Rating: {rating} <i class="mi-favorite" /></p>
			<a
				href="/profile/{id}"
				role="button"
			>
				{'>Ver perfil'}
			</a>
			<!-- todo: ver como es el formato de los perfiles de profesionales-->
		</div>
	</article>
{/each}
