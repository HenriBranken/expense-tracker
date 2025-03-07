<script>
	import '../styles/global.scss';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<div class="layout">
	<Header />

	<div class="slot">
		<slot />
	</div>

	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Ensures it takes full viewport height */
	}

	.slot {
		flex-grow: 1; /* Pushes footer down */
	}
</style>
