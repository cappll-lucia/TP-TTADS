<nav>
	<ul>
		<li><a href="/admin/service">Services</a></li>
		<li><a href="/admin/city">Cities</a></li>
		<li><a href="/admin/province">Provinces</a></li>
	</ul>
</nav>

<slot />

<style lang="scss">
	ul {
		display: flex;
		gap: 1rem;
	}
	nav {
		margin-right: 2rem;
		margin-left: 2rem;
		padding-left: 6rem;
		border: 1px solid gray;
		border-top: none;
		border-radius: 0 0 5rem 5rem;
		text-align: center;
	}
</style>
