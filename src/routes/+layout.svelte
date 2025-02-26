<script>
	import '../styles/global.scss';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import { loadConfigFromFile } from 'vite';

	// Makes the `user` available as `data.user` in all pages under this layout.
	export const load = ({ locals }) => ({ user: locals.user }); // Use the `user` from the middleware.
</script>

<Header />

<slot />

<Footer />
