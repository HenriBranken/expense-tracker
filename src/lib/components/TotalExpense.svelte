<script>
	export let total;
	let displayTotal = Number(total).toFixed(2);
	let [rands, cents] = displayTotal.split('.');
</script>

<div>
	Total:&ensp;<br /><span class="currency">R&nbsp;</span><span class="rands">{rands}</span><span
		class="dot">&middot;</span
	><span class="cents">{cents}</span>
</div>

<style>
	div {
		position: fixed;
		left: 0;
		top: 33%;
		margin-left: 12px;
		font-size: 2.3rem;
		font-weight: bold;
		text-align: left;
	}

	.currency {
		font-size: 2.5rem;
	}

	.rands {
		font-size: 2rem;
		font-weight: bold;
	}

	.dot {
		vertical-align: middle;
	}

	.cents {
		font-size: 1.5rem;
	}
</style>
