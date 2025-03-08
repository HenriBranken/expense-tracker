<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import ExpenseForm2 from '$lib/components/ExpenseForm2.svelte';
	import ExpenseList from '$lib/components/ExpenseList.svelte';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import { fetchExpenses, addExpense, deleteExpense, editExpense } from '$lib/api.js';
	import TotalExpense from '$lib/components/TotalExpense.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let tabs = ['Current Expenses', 'New Expense'];
	let activeTab = tabs[0];

	// Sorting fields
	const sortFields = ['name', 'amount', 'date'];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];
	let isLoading = true;

	let activeSort = { criterion: '', order: '' };

	// Sorting function
	const handleSortExpenses = (criterion, order) => {
		activeSort = { criterion, order };
		if (criterion === 'name') {
			expenses = [...expenses].sort((a, b) =>
				order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
			);
		} else if (criterion === 'amount') {
			expenses = [...expenses].sort((a, b) =>
				order === 'asc' ? a.amount - b.amount : b.amount - a.amount
			);
		} else if (criterion === 'date') {
			expenses = [...expenses].sort((a, b) =>
				order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
			);
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
			// Reapply the last sorting order after updating expenses
			if (activeSort.criterion && activeSort.order) {
				handleSortExpenses(activeSort.criterion, activeSort.order);
			}
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

	const handleEditExpense = async (updatedExpense) => {
		isLoading = true;
		const editedExpense = await editExpense(updatedExpense);
		if (editedExpense) {
			await loadExpenses();

			// Reapply the last sorting order after updating expenses
			if (activeSort.criterion && activeSort.order) {
				handleSortExpenses(activeSort.criterion, activeSort.order);
			}
		}
		isLoading = false;
	};

	// Load the expenses when the component mounts:
	onMount(loadExpenses);
	setContext('handleDeleteExpense', handleDeleteExpense);
	setContext('handleEditExpense', handleEditExpense);

	const computeTotal = (arr, boolFlag) => {
		return !boolFlag ? arr.reduce((sum, elem) => sum + elem.amount, 0) : 0;
	};

	const computeNumberOfExpenses = (arr) => {
		return arr.length;
	};

	$: total = computeTotal(expenses, isLoading);
	$: nExpenses = computeNumberOfExpenses(expenses);
</script>

<main>
	<div class="nav">
		<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
		{#if activeTab === tabs[0] && nExpenses > 0}
			<div class="sort-bar">
				{#each sortFields as field}
					<div class="sort-row">
						<span class="label">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
						<button
							on:click={() => handleSortExpenses(field, 'asc')}
							class:active-btn={activeSort.criterion === field && activeSort.order === 'asc'}
							class="btn"
						>
							<FontAwesomeIcon icon={faArrowUp} />
						</button>
						<button
							on:click={() => handleSortExpenses(field, 'desc')}
							class:active-btn={activeSort.criterion === field && activeSort.order === 'desc'}
							class="btn"
						>
							<FontAwesomeIcon icon={faArrowDown} />
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	{#if isLoading}
		<Loading />
	{:else if !isLoading && activeTab === tabs[0] && nExpenses > 0}
		<ExpenseList {expenses} />
	{:else if !isLoading && activeTab === tabs[0] && nExpenses == 0}
		<div>
			I need to add a component here to alert the user that they still need to buy something.
		</div>
	{:else if !isLoading && activeTab === tabs[1]}
		<ExpenseForm2 on:addNewExpense={handleAddExpense} />
	{/if}
	{#if !isLoading && activeTab === tabs[0] && nExpenses > 0}
		<TotalExpense {total} />
	{/if}
</main>

<style>
	main {
		margin-top: 0;
	}

	div.nav {
		position: sticky;
		top: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 1000;
		padding-bottom: 30px;
		padding-top: 5px;
	}

	.sort-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		gap: 16px;
		white-space: nowrap;
		overflow-x: auto; /* Enables horizontal scrolling if content overflows */
		gap: 15px;
		padding: 15px;
		background: rgba(0, 0, 0, 0.9);
		border-radius: 10px;
		margin: 0 auto;
	}

	.sort-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.label {
		font-size: 1rem;
		color: white;
		font-weight: bold;
	}

	.btn {
		background: #3498db;
		color: white;
		border: none;
		padding: 6px 10px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.3s ease-in-out;
		width: 40px; /* Ensures both buttons are the same width */
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn:hover {
		background: #2980b9;
	}

	.active-btn {
		background: #e67e22 !important;
		color: white;
		box-shadow: 0px 0px 10px rgba(255, 165, 0, 0.8);
	}
</style>
