<script>
	import Tabs from '../lib/components/Tabs.svelte';
	import ExpenseForm from '../lib/components/ExpenseForm.svelte';

	import { fetchExpenses, addExpense, deleteExpense } from '$lib/api.js';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];

	const loadExpenses = async () => {
		expenses = await fetchExpenses();
	};

	const handleAddExpense = async (event) => {
		const newExpense = event.detail;
		const addedExpense = await addExpense(newExpense);

		if (addedExpense) {
			expenses = [...expenses, addedExpense];
		}
	};

	const handleDeleteExpense = async (id) => {
		const deletedExpense = await deleteExpense(id);
		if (deletedExpense) expenses = expenses.filter((exp) => exp._id !== id);
	};

	// Load the expenses when the component mounts:
	loadExpenses();
</script>

<main>
	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
	{#if activeTab === tabs[0]}{:else if activeTab === tabs[1]}
		<ExpenseForm />
	{/if}
</main>
