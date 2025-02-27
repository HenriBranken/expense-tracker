<script>
	import DelButton from './DelButton.svelte';
	export let expense;

	// ----------------------------------------------------------------------------------------------
	let isEditing = false;

	// The Editable Fields:
	let editedTitle = expense.title;
	let editedDescription = expense.description;
	let editedDate = expense.date;
	let editedAmount = expense.amount;

	// Toggling Edit Mode:
	const toggleEdit = () => {
		isEditing = !isEditing; // negate.
		console.log(`isEditing is now set to ${isEditing}.`);
	};

	// ----------------------------------------------------------------------------------------------
</script>

<div class="details">
	<div class="header">
		{#if isEditing}
			<input type="text" bind:value={editedTitle} class="input-title" />
		{:else}
			<h4>{expense.title}</h4>
		{/if}
		<button on:click={toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
		<DelButton expenseId={expense._id} />
	</div>
	{#if isEditing}
		<!-- Editable Form -->
		<p><b>Description:</b> <input type="text" bind:value={editedDescription} /></p>
		<p><b>Date:</b> <input type="date" bind:value={editedDate} /></p>
		<p>
			<b>Amount:</b>
			<span class="currency">R</span>
			<input type="number" step="0.01" bind:value={editedAmount} />
		</p>
		<button>Save</button>
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
		vertical-align: center;
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
