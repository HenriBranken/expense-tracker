<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import ExpenseForm from '$lib/components/ExpenseForm.svelte';
	import ExpenseList from '$lib/components/ExpenseList.svelte';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';

	import { fetchExpenses, addExpense, deleteExpense } from '$lib/api.js';
	import TotalExpense from '$lib/components/TotalExpense.svelte';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];
	let isLoading = true;

	const loadExpenses = async () => {
		const data = await fetchExpenses();
		expenses = [...data];
		console.log(
			`Inside +page.svelte, inside loadExpenses(), expenses have length ${expenses.length}.`
		);
		isLoading = false;
	};

	const handleAddExpense = async (event) => {
		isLoading = true;
		const newExpense = event.detail;
		console.log(
			`${newExpense.title} ${newExpense.description} ${newExpense.date} ${newExpense.amount} ${typeof newExpense.amount}`
		);
		const addedExpense = await addExpense(newExpense);

		if (addedExpense) {
			expenses = [...expenses, addedExpense];
			activeTab = tabs[0];
		}
		isLoading = false;
	};

	const handleDeleteExpense = async (id) => {
		isLoading = true;
		const deletedExpense = await deleteExpense(id);
		if (deletedExpense) expenses = expenses.filter((exp) => exp._id !== id);
		isLoading = false;
	};

	// Load the expenses when the component mounts:
	onMount(loadExpenses);
	setContext('handleDeleteExpense', handleDeleteExpense);

	const computeTotal = (arr, boolFlag) => {
		return !boolFlag ? arr.reduce((sum, elem) => sum + elem.amount, 0) : 0;
	};

	$: total = computeTotal(expenses, isLoading);
</script>

<main>
	{#if isLoading}
		<p>Loading. . .</p>
	{:else}
		<TotalExpense {total} />
	{/if}

	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
	{#if activeTab === tabs[0]}
		<ExpenseList {expenses} />
	{:else if activeTab === tabs[1]}
		<ExpenseForm on:addNewExpense={handleAddExpense} />
	{/if}
</main>
