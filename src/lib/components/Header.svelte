<script>
	import GitHubIcon from './GitHubIcon.svelte';
</script>

<header>
	<h1>Expense Tracker</h1>
	<span
		>By <a target="_blank" href="https://github.com/HenriBranken">Henri Branken</a>&nbsp; <GitHubIcon
			width={15}
			height={15}
			color="white"
		/></span
	>
</header>

<style>
	header {
		background: black;
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	h1 {
		color: white;
		font-size: 3rem;
		padding: 0;
		margin: 5px;
	}

	span {
		color: white;
		font-size: small;
		margin-top: -5pt;
	}

	a:link,
	a:visited {
		color: white;
		font-weight: bolder;
	}
</style>
