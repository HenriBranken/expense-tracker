<script>
	export let expense;
</script>

<div class="card">
	<p><strong>{expense.title}</strong></p>
	<p>{expense.description}</p>
	<p>{expense.Date}</p>
	<p>R{expense.amount}</p>
</div>
