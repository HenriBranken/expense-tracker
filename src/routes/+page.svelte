<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import ExpenseForm2 from '$lib/components/ExpenseForm2.svelte';
	import ExpenseList from '$lib/components/ExpenseList.svelte';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';

	import { fetchExpenses, addExpense, deleteExpense } from '$lib/api.js';
	import TotalExpense from '$lib/components/TotalExpense.svelte';
	import Loading from '$lib/components/Loading.svelte';

	import { login, logout } from '$lib/luciaApi';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};

	let expenses = [];
	let isLoading = true;

	// Get the `user` from the server load function in +layout.svelte.
	export let data; // `data` automatically provided by SvelteKit's `load` function.
	let { user } = data; // destructure `user`.

	// ----------------------------------------------------------------------------------------------
	// Expense Handler Functions.
	// ----------------------------------------------------------------------------------------------

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

	const computeTotal = (arr, boolFlag) => {
		return !boolFlag ? arr.reduce((sum, elem) => sum + elem.amount, 0) : 0;
	};
	$: total = computeTotal(expenses, isLoading);

	// ----------------------------------------------------------------------------------------------
	// Auth Handler Functions.
	// ----------------------------------------------------------------------------------------------

	let username = '';
	let password = '';
	let message = '';

	// Load expenses only if user is logged in
	if (user) {
		loadExpenses();
	}

	const handleLogin = async () => {
		console.log(`username=${username} and password=${password}.`);
		const response = await login(username, password);
		if (response.includes('Successful')) {
			location.reload(); // Reload page to get updated user data from server
		} else {
			message = 'Login Failed';
		}
	};

	const handleLogout = async () => {
		await logout();
		location.reload(); // Reload page to update user state
	};
	// ----------------------------------------------------------------------------------------------

	// Load the expenses when the component mounts:
	onMount(loadExpenses);
	setContext('handleDeleteExpense', handleDeleteExpense);
</script>

<main>
	{#if !user}
		<!-- Show login form if user is not logged in -->
		<h1>Login</h1>
		<input type="text" bind:value={username} placeholder="Username" />
		<input type="password" bind:value={password} placeholder="Password" />
		<button on:click={handleLogin}>Login</button>
		<p>{message}</p>
	{:else}
		<!-- Show the main application if user is logged in -->
		<button on:click={handleLogout}>Logout</button>

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
