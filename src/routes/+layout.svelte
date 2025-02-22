<script>
	import '../styles/global.scss';
	import Header from '../lib/components/Header.svelte';
	const currentYear = new Date().getFullYear();
</script>

<Header />

<slot />

<footer>
	<p>&copy; {currentYear} Expense Tracker. All rights reserved.</p>
</footer>
