<script>
	import Tabs from '../lib/components/Tabs.svelte';

	let tabs = ['Current Expenses', 'Create New Expense'];
	let activeTab = tabs[0];

	const tabChange = (e) => {
		e.preventDefault();
		activeTab = e.detail;
	};
</script>

<main>
	<Tabs {activeTab} {tabs} on:tabChange={tabChange} />
</main>
