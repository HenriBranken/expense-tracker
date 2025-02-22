<script>
	import ExpenseDetails from './ExpenseDetails.svelte';
	export let expenses;
</script>

<div class="expense-list">
	{#each expenses as expense (expense._id)}
		<div>
			<ExpenseDetails {expense} />
		</div>
	{/each}
</div>

<style>
	.expense-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 20px;
	}
</style>
