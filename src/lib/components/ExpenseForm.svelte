<script>
	let dateString = () => new Date().toISOString().split('T')[0];

	let fields = {
		title: '',
		description: '',
		date: dateString(),
		amount: 0
	};

	const submitExpense = () => {
		console.log(fields);
	};
</script>

<form on:submit|preventDefault={submitExpense}>
	<div class="form-field">
		<label for="title">Title:</label>
		<input type="text" id="title" required bind:value={fields.title} />
	</div>
	<div class="form-field">
		<label for="description">Description:</label>
		<input type="text" id="description" required bind:value={fields.description} />
	</div>
	<div class="form-field">
		<label for="date">Date:</label>
		<input type="date" id="date" required bind:value={fields.date} />
	</div>
	<div class="form-field">
		<label for="amount">Amount (ZAR):</label>
		<input type="number" step="0.01" min="0.01" id="amount" required bind:value={fields.amount} />
	</div>
	<button>Add Expense</button>
</form>

<style>
	form {
		width: 400px;
		margin: 0 auto;
		text-align: left;
	}

	.form-field {
		margin: 18px auto;
	}
	input {
		width: 100%;
		border-radius: 6px;
		padding: 4px;
	}
	label {
		display: block;
		margin-bottom: 6px;
		font-weight: bold;
	}

	button {
		display: block;
		margin: 20px auto;
		padding: 10px 15px;
		border-radius: 6px;
		background: red;
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		cursor: pointer;
	}
</style>
