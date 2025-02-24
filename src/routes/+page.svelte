<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import ExpenseForm2 from '$lib/components/ExpenseForm2.svelte';
	import ExpenseList from '$lib/components/ExpenseList.svelte';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';

	import { fetchExpenses, addExpense, deleteExpense } from '$lib/api.js';
	import TotalExpense from '$lib/components/TotalExpense.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];
	let isLoading = true;

	// Sorting function
	const handleSortExpenses = (criterion) => {
		if (criterion === 'name') {
			expenses = [...expenses].sort((a, b) => a.title.localeCompare(b.title));
		} else if (criterion === 'amount') {
			expenses = [...expenses].sort((a, b) => a.amount - b.amount);
		} else if (criterion === 'date') {
			expenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
		}
	};

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
		<Loading />
	{:else}
		<TotalExpense {total} />
	{/if}

	<div class="sidebar">
		<button on:click={() => handleSortExpenses('name')}>Order by Name</button>
		<button on:click={() => handleSortExpenses('amount')}>Order by Amount</button>
		<button on:click={() => handleSortExpenses('date')}>Order by Date</button>
	</div>

	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
	{#if activeTab === tabs[0]}
		<ExpenseList {expenses} />
	{:else if activeTab === tabs[1]}
		<ExpenseForm2 on:addNewExpense={handleAddExpense} />
	{/if}
</main>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		top: 60%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		background: rgba(0, 0, 0);
		border-radius: 0 10px 10px 0;
	}

	.sidebar button {
		background: #3498db;
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.3s ease-in-out;
		text-align: left;
	}

	.sidebar button:hover {
		background: #2980b9;
	}
</style>
