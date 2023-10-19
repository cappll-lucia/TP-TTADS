<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { confirmedAppointments, otherAppointments, pendingAppointments } = data;

	let modal: HTMLElement;
	let appointment_data = { id: '', description: '' };

	const closeModal = () => {
		modal.attributes.removeNamedItem('open');
		appointment_data.description = '';
	};

	const setUpModal = (app: { id: string; description: string }) => {
		appointment_data.description = app.description;
		appointment_data.id = app.id;
		modal.setAttribute('open', 'true');
	};
</script>

<dialog
	id="modal"
	bind:this={modal}
>
	<article>
		<form method="post">
			<header>
				<a
					href="#"
					on:click={closeModal}><i class="mi-close" /></a
				>
				<h3>Detalles del Turno</h3>
			</header>
			<input
				name="appointment_id"
				value={appointment_data?.id || ''}
				hidden
			/>
			<p>{appointment_data?.description || ''}</p>
			<footer>
				<button
					class="cancel outline"
					type="submit"
					formaction="?/cancelar"
				>
					Cancelar
				</button>
				<button
					type="submit"
					class="accept"
					formaction="?/confirmar"
				>
					Aceptar
				</button>
			</footer>
		</form>
	</article>
</dialog>

<main class="container">
	<h1>Turnos</h1>
	<article>
		<h2>Pendientes de confirmacion</h2>
		{#each pendingAppointments as app}
			<div>
				<h3>{app.date}</h3>
				<p>{app.description}</p>
				<button on:click={() => setUpModal(app)}>Detalles</button>
			</div>
		{/each}
	</article>
	<article>
		<h2>Por realizar</h2>
		{#each confirmedAppointments as app}
			<div>
				<h3>{app.date}</h3>
				<p>{app.description}</p>
			</div>
		{/each}
	</article>
	<article>
		<h2>Historial</h2>
		{#each otherAppointments as app}
			<div>
				<h3>{app.date}</h3>
				<p>{app.description}</p>
				<p>{app.state}</p>
			</div>
		{/each}
	</article>
</main>

<style>
	.cancel {
		border-color: red;
		color: red;
	}
</style>
