<script>
	import Tabs from '../lib/components/Tabs.svelte';
	import ExpenseForm from '../lib/components/ExpenseForm.svelte';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};
</script>

<main>
	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
	{#if activeTab === tabs[0]}{:else if activeTab === tabs[1]}
		<ExpenseForm />
	{/if}
</main>
