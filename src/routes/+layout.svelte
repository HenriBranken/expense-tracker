<script>
	import '../styles/global.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { redirect } from '@sveltejs/kit';

	/**
	 * Server-Side function ensures that only authenticated users can access the app.
	 * If a user is not logged in, it forces a redirect to "/login"
	 * locals contains server-side session data.
	 */
	export const load = ({ locals }) => {
		// if no user session is found, force a redirect to "/login"
		if (!locals.user) {
			// 307 --> Temporary Redirect (preserves the original request method).
			throw redirect(307, '/login');
		}
	};
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
