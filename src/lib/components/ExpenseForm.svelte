<script>
	import AddButton from '$lib/components/AddButton.svelte';
	import { createEventDispatcher } from 'svelte';

	let dispatch = new createEventDispatcher();

	let generateTodayString = () => new Date().toISOString().split('T')[0];

	let fields = {
		title: '',
		description: '',
		date: generateTodayString(),
		amount: ''
	};

	let errorsMsgs = {
		title: '',
		description: '',
		date: '',
		amount: ''
	};

	let valid = false;

	// Validate Title
	const validateTitle = () => {
		if (fields.title.trim().length <= 1) {
			errorsMsgs.title = 'Title must be at least 2 characters long.';
			return false;
		}
		errorsMsgs.title = '';
		return true;
	};

	// Validate Description
	const validateDescription = () => {
		if (fields.description.trim().length <= 2) {
			errorsMsgs.description = 'Description must be at least 3 characters long.';
			return false;
		}
		errorsMsgs.description = '';
		return true;
	};

	// Validate Date
	const validateDate = () => {
		if (!fields.date || fields.date.trim() === '') {
			errorsMsgs.date = 'Date cannot be empty.';
			return false;
		} else if (fields.date > generateTodayString()) {
			errorsMsgs.date = 'Future dates are not allowed';
			return false;
		}
		errorsMsgs.date = '';
		return true;
	};

	// Validate Amount
	const validateAmount = () => {
		let amountValue = fields.amount.toString().trim();
		if (amountValue === '' || isNaN(amountValue) || Number(amountValue) <= 0) {
			errorsMsgs.amount = 'Amount must be a positive number.';
			return false;
		}
		fields.amount = Number(fields.amount);
		errorsMsgs.amount = '';
		return true;
	};

	// Submit Expense (Calls all validation functions)
	const submitExpense = () => {
		let titleValid = validateTitle();
		let descValid = validateDescription();
		let dateValid = validateDate();
		let amountValid = validateAmount();
		valid = titleValid && descValid && dateValid && amountValid;
		if (valid) {
			dispatch('addNewExpense', { ...fields }); // Emit custom event 'addExpense' with validated data.
			fields = {
				title: '',
				description: '',
				date: generateTodayString(),
				amount: ''
			}; // Reset the form.
		}
	};
</script>

<form on:submit|preventDefault={submitExpense}>
	<div class="form-field">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={fields.title} on:blur={validateTitle} />
		<div class="error">{errorsMsgs.title}</div>
	</div>
	<div class="form-field">
		<label for="description">Description:</label>
		<input
			type="text"
			id="description"
			bind:value={fields.description}
			on:blur={validateDescription}
		/>
		<div class="error">{errorsMsgs.description}</div>
	</div>
	<div class="form-field">
		<label for="date">Date:</label>
		<input
			type="date"
			id="date"
			min="2023-01-01"
			max={generateTodayString()}
			bind:value={fields.date}
			on:blur={validateDate}
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
			on:blur={validateAmount}
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
