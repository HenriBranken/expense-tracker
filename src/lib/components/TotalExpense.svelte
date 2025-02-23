<script>
	export let total;
	let displayTotal = Number(total).toFixed(2);
	let [rands, cents] = displayTotal.split('.');
</script>

<div>
	Total Expense: <span class="currency">R</span><span class="rands">{rands}</span><span class="dot"
		>&middot;</span
	><span class="cents">{cents}</span>
</div>

<style>
	div {
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
		color: #222;
	}

	.cents {
		font-size: 1.5rem;
	}

	.dot {
		vertical-align: middle;
	}
</style>
