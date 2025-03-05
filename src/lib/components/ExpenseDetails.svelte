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
			{#if isEditing}
				<SaveButton onClick={triggerEdit} />
			{/if}
			<EditButton {isEditing} onClick={toggleEdit} />
			<DelButton expenseId={expense._id} />
		</div>
	</div>
	{#if isEditing}
		<!-- Editable Form -->
		<div class="deets">
			<span class="label">Description:</span>
			<span class="detail">
				<input type="text" id="description" bind:value={editableFields.description} />
			</span>

			<span class="label">Date:</span>
			<span class="detail">
				<input
					type="date"
					id="date"
					min="2023-01-01"
					max={generateTodayString()}
					bind:value={editableFields.date}
				/>
			</span>

			<span class="label">Amount:</span>
			<span class="detail">
				<input
					type="number"
					id="amount"
					step="0.01"
					min="0.01"
					bind:value={editableFields.amount}
				/>
			</span>
		</div>
	{:else}
		<div class="deets">
			<span class="label">Description:</span> <span class="detail">{expense.description}</span>
			<span class="label">Date:</span> <span class="detail">{expense.date}</span>
			<span class="label">Amount:</span>
			<span class="detail">
				<span class="currency">R</span>{Number(expense.amount).toFixed(2)}
			</span>
		</div>
	{/if}
</div>

<style>
	div.deets {
		margin-top: 10px;
		display: grid;
		grid-template-columns: 1fr 3fr;
		width: 100%;
	}

	span.label {
		text-align: right;
		padding-right: 15px;
		font-weight: bold;
	}

	.details {
		background: #ffffff;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		margin: 10px auto;
		transition: transform 0.2s ease-in-out;
	}

	.details:hover {
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}

	.detail input {
		flex: 1; /* Makes the input fields take up all remaining space */
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button-group {
		margin-left: auto;
		padding-left: 15px;
		display: flex;
		gap: 8px;
	}

	h4 {
		margin: 0;
		font-size: 1.2rem;
		text-decoration: underline;
	}

	.currency {
		color: black;
		font-size: 1.1rem;
	}
</style>
