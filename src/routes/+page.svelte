<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import ExpenseForm from '$lib/components/ExpenseForm.svelte';
	import { onMount } from 'svelte';

	import { fetchExpenses, addExpense, deleteExpense } from '$lib/api.js';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];

	const loadExpenses = async () => {
		const data = await fetchExpenses();
		expenses = data;
		console.log(
			`Inside +page.svelte, inside loadExpenses(), expenses are: ${expenses} with length ${expenses.length}.`
		);
	};

	const handleAddExpense = async (event) => {
		const newExpense = event.detail;
		console.log(`Inside +page.svelte, inside handleAddExpense(), newExpense is: ${newExpense}.`);
		console.log(
			`${newExpense.title} ${newExpense.description} ${newExpense.date} ${newExpense.amount} ${typeof newExpense.amount}`
		);
		const addedExpense = await addExpense(newExpense);
		console.log(
			`Inside +page.svelte, inside handleAddExpense(), addedExpense is: ${addedExpense}.`
		);

		if (addedExpense) {
			expenses = [...expenses, addedExpense];
		}
	};

	const handleDeleteExpense = async (id) => {
		const deletedExpense = await deleteExpense(id);
		if (deletedExpense) expenses = expenses.filter((exp) => exp._id !== id);
	};

	// Load the expenses when the component mounts:
	onMount(loadExpenses);
</script>

<main>
	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
	{#if activeTab === tabs[0]}{:else if activeTab === tabs[1]}
		<ExpenseForm on:addNewExpense={handleAddExpense} />
	{/if}
</main>
