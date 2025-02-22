<script>
	import { getContext } from 'svelte';
	const handleDeleteExpense = getContext('handleDeleteExpense');

	export let expenseId;

	const handleDeleteClick = () => {
		handleDeleteExpense(expenseId);
	};
</script>

<button on:click={handleDeleteClick} class="delete-btn"> &times; </button>

<style>
	.delete-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: none;
		background: #ff4d4d;
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.1s;
	}

	.delete-btn:hover {
		background: #e60000;
	}

	.delete-btn:active {
		transform: scale(0.9);
	}

	.delete-btn:focus {
		outline: 2px solid rgba(255, 77, 77, 0.6);
	}
</style>
