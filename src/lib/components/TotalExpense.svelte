<script>
	export let total;
	let displayTotal = Number(total).toFixed(2);
	let [rands, cents] = displayTotal.split('.');
</script>

<div>
	<span class="currency">R&nbsp;</span><span class="rands">{rands}</span><span class="dot"
		>&middot;</span
	><span class="cents">{cents}</span>
</div>

<style>
	div {
		position: sticky; /* Sticks relative to the viewport */
		bottom: 0; /* Positions it at the bottom */
		font-size: 2.3rem;
		font-weight: bold;
		text-align: center;
		width: 30%;
		background: rgba(0, 0, 0, 1);
		color: white;
		margin: auto;
		margin-top: 15px;
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
		padding: 0 5px;
	}

	.cents {
		font-size: 1.5rem;
	}
</style>
