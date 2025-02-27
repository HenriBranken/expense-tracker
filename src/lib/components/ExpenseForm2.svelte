<script>
	import { errorMsgsInit, fieldsInit, generateTodayString } from '$lib/utils';
	import AddButton from '$lib/components/AddButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { validateForm } from '$lib/utils';

	let dispatch = new createEventDispatcher();

	let fields = { ...fieldsInit };

	let errorMsgs = { ...errorMsgsInit };

	let valid = false;

	// Submit Expense
	const submitExpense = () => {
		const result = validateForm(errorMsgs, fields);
		valid = result.boolVal;
		errorMsgs = { ...result.errorMsgs };

		if (valid) {
			dispatch('addNewExpense', { ...fields }); // Emit custom event 'addExpense' with validated data.
			fields = { ...fieldsInit };
		}
	};
</script>

<form on:submit|preventDefault={submitExpense}>
	<div class="form-field">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={fields.title} />
		<div class="error">{errorMsgs.title}</div>
	</div>
	<div class="form-field">
		<label for="description">Description:</label>
		<input type="text" id="description" bind:value={fields.description} />
		<div class="error">{errorMsgs.description}</div>
	</div>
	<div class="form-field">
		<label for="date">Date:</label>
		<input
			type="date"
			id="date"
			min="2023-01-01"
			max={generateTodayString()}
			bind:value={fields.date}
		/>
		<div class="error">{errorMsgs.date}</div>
	</div>
	<div class="form-field">
		<label for="amount">Amount (ZAR):</label>
		<input
			type="number"
			min="0.01"
			step="0.01"
			id="amount"
			bind:value={fields.amount}
			placeholder="E.g. 199.99"
		/>
		<div class="error">{errorMsgs.amount}</div>
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
		padding: 6px;
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
