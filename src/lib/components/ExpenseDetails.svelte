<script>
	import DelButton from './DelButton.svelte';
	import EditButton from './EditButton.svelte';
	import SaveButton from './SaveButton.svelte';
	import { getContext } from 'svelte';
	import {
		createDateString,
		generateTodayString,
		validateForm,
		editableFieldsInit,
		errorMsgsInit,
		generateErrorAlert
	} from '$lib/utils';
	export let expense;
	const handleEditExpense = getContext('handleEditExpense');

	// ----------------------------------------------------------------------------------------------
	let isEditing = false;

	// The Editable Fields:
	let editableFields = {
		id: expense._id,
		title: expense.title,
		description: expense.description,
		date: createDateString(expense.date),
		amount: expense.amount
	};
	let errorMsgs = { ...errorMsgsInit };

	// Toggling Edit Mode:
	const toggleEdit = () => {
		isEditing = !isEditing; // negate.
	};

	let valid = false;
	// Submit Expense
	const triggerEdit = () => {
		const result = validateForm(errorMsgs, editableFields);
		valid = result.boolVal;
		errorMsgs = { ...result.errorMsgs };
		if (valid) {
			console.log(
				`Inside Details.svelte, Editable Fields are as follows: ${editableFields.id}, ${editableFields.title}, ${editableFields.description}, ${editableFields.date}, ${editableFields.amount}.`
			);
			handleEditExpense(editableFields);
			isEditing = false;
			valid = false;
		} else {
			alert(generateErrorAlert(errorMsgs));
			valid = false;
			editableFields = { ...expense, date: createDateString(expense.date), id: expense._id };
		}
	};

	// ----------------------------------------------------------------------------------------------
</script>

<div class="details">
	<div class="header">
		{#if isEditing}
			<input type="text" id="title" bind:value={editableFields.title} class="input-title" />
		{:else}
			<h4>{expense.title}</h4>
		{/if}
		<div class="button-group">
			<EditButton {isEditing} onClick={toggleEdit} />
			<DelButton expenseId={expense._id} />
		</div>
	</div>
	{#if isEditing}
		<!-- Editable Form -->
		<p>
			<b>Description:</b>
			<input type="text" id="description" bind:value={editableFields.description} />
		</p>
		<p>
			<b>Date:</b>
			<input
				type="date"
				id="date"
				min="2023-01-01"
				max={generateTodayString()}
				bind:value={editableFields.date}
			/>
		</p>
		<p>
			<b>Amount:</b>
			<span class="currency">R</span>
			<input type="number" id="amount" step="0.01" min="0.01" bind:value={editableFields.amount} />
		</p>
		<SaveButton onClick={triggerEdit} />
	{:else}
		<p><b>Description:</b> {expense.description}</p>
		<p><b>Date:</b> {expense.date}</p>
		<p><b>Amount:</b> <span class="currency">R</span>{Number(expense.amount).toFixed(2)}</p>
	{/if}
</div>

<style>
	.details {
		background: #ffffff;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		margin: 10px auto;
		transition: transform 0.2s ease-in-out;
	}

	.details:hover {
		transform: scale(1.02);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button-group {
		margin-left: auto; /* Push buttons to the right */
		display: flex;
		gap: 8px; /* Add spacing between buttons */
	}

	h4 {
		margin: 0;
		font-size: 1.2rem;
		text-decoration: underline;
	}

	p {
		margin: 8px 0;
		font-size: 0.95rem;
	}

	.currency {
		color: black;
		font-size: 1.1rem;
	}
</style>
