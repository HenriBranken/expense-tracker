<script>
	import AddButton from '$lib/components/AddButton.svelte';

	let generateDateString = () => new Date().toISOString().split('T')[0];

	let fields = {
		title: '',
		description: '',
		date: generateDateString(),
		amount: ''
	};

	let errorsMsgs = {
		title: '',
		description: '',
		date: '',
		amount: ''
	};

	let valid = false;

	const submitExpense = () => {
		valid = true;

		if (fields.title.trim().length <= 1) {
			valid = false;
			errorsMsgs.title = 'Title must be at least 2 characters long.';
		} else {
			errorsMsgs.title = '';
		}

		if (fields.description.trim().length <= 2) {
			valid = false;
			errorsMsgs.description = 'Description must be at least 3 characters long.';
		} else {
			errorsMsgs.description = '';
		}

		if (!fields.date || fields.date.trim() === '') {
			valid = false;
			errorsMsgs.date = 'Date cannot be empty.';
		} else if (fields.date > generateDateString()) {
			valid = false;
			errorsMsgs.date = 'Future dates are not allowed';
		} else {
			errorsMsgs.date = '';
		}

		let amountValue = fields.amount.toString().trim();
		if (amountValue === '' || isNaN(amountValue) || amountValue <= 0) {
			valid = false;
			errorsMsgs.amount = 'Amount must be a positive number.';
			return false;
		} else if (!/^\d+(\.\d{1,2})?$/.test(amountValue)) {
			valid = false;
			errorsMsgs.amount = 'Only up to 2 decimal places are allowed.';
		} else {
			errorsMsgs.amount = '';
		}

		if (valid) {
			console.log(valid, fields);
		}
	};
</script>

<form on:submit|preventDefault={submitExpense}>
	<div class="form-field">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={fields.title} />
		<div class="error">{errorsMsgs.title}</div>
	</div>
	<div class="form-field">
		<label for="description">Description:</label>
		<input type="text" id="description" bind:value={fields.description} />
		<div class="error">{errorsMsgs.description}</div>
	</div>
	<div class="form-field">
		<label for="date">Date:</label>
		<input
			type="date"
			id="date"
			min="2023-01-01"
			max={generateDateString()}
			bind:value={fields.date}
		/>
		<div class="error">{errorsMsgs.date}</div>
	</div>
	<div class="form-field">
		<label for="amount">Amount (ZAR):</label>
		<input
			type="number"
			step="0.01"
			id="amount"
			bind:value={fields.amount}
			placeholder="E.g. 199.99"
		/>
		<div class="error">{errorsMsgs.amount}</div>
	</div>
	<AddButton />
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

	.error {
		font-weight: bold;
		font-size: 0.9rem;
		color: red;
		min-height: 1.5rem;
		margin-top: 5px;
	}
</style>
