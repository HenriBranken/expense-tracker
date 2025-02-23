<script>
	import AddButton from '$lib/components/AddButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		validateExpense,
		validateTitle,
		validateDescription,
		validateDate,
		validateAmount,
		generateTodayString
	} from '$lib/utils/validateExpense.js';

	let dispatch = createEventDispatcher();

	let fields = {
		title: '',
		description: '',
		date: generateTodayString(),
		amount: ''
	};

	let errorMsgs = {
		title: '',
		description: '',
		date: '',
		amount: ''
	};

	let valid = false;

	const handleTitleBlur = () => {
		errorMsgs = validateTitle(fields.title, errorMsgs); // ✅ Reassign errorMsgs
	};

	const handleDescriptionBlur = () => {
		errorMsgs = validateDescription(fields.description, errorMsgs);
	};

	const handleDateBlur = () => {
		errorMsgs = validateDate(fields.date, errorMsgs);
	};

	const handleAmountBlur = () => {
		errorMsgs = validateAmount(fields.amount, errorMsgs);
	};

	const submitExpense = () => {
		errorMsgs = validateExpense(fields, errorMsgs);
		valid = Object.values(errorMsgs).every((msg) => msg === '');
		if (valid) {
			dispatch('addNewExpense', { ...fields }); // Emit validated data
			fields = {
				title: '',
				description: '',
				date: generateTodayString(),
				amount: ''
			}; // Reset form fields
			errorMsgs = { title: '', description: '', date: '', amount: '' };
		}
	};
</script>

<form on:submit|preventDefault={submitExpense}>
	<div class="form-field">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={fields.title} on:blur={handleTitleBlur} />
		<div class="error">{errorMsgs.title}</div>
	</div>

	<div class="form-field">
		<label for="description">Description:</label>
		<input
			type="text"
			id="description"
			bind:value={fields.description}
			on:blur={handleDescriptionBlur}
		/>
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
			on:blur={handleDateBlur}
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
			on:blur={handleAmountBlur}
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
