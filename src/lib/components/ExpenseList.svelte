<script>
	import ExpenseDetails from './ExpenseDetails.svelte';
	export let expenses;
</script>

<div class="expense-list">
	{#each expenses as expense (expense._id)}
		<ExpenseDetails {expense} />
	{/each}
</div>

<style>
	.expense-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 4 equal columns. */
		gap: 20px;
		align-items: stretch; /* Ensures items stretch to the same height (per row). */
	}

	/* 3 columns for medium-large screens */
	@media (max-width: 1024px) {
		.expense-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* 2 columns for tablets */
	@media (max-width: 768px) {
		.expense-list {
			grid-template-columns: repeat(2, 1fr);
			gap: 15px;
		}
	}

	/* 1 column for small screens (mobile) */
	@media (max-width: 480px) {
		.expense-list {
			grid-template-columns: 1fr;
			gap: 10px;
		}
	}
</style>
