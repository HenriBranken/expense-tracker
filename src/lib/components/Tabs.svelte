<script>
	import { createEventDispatcher } from 'svelte';
	export let tabs;
	export let activeTab;

	const dispatch = createEventDispatcher();
</script>

<div class="tabs">
	<ul>
		{#each tabs as tab, index}
			<li>
				<button
					role="tab"
					class:active={tab === activeTab}
					on:click={() => dispatch('tabChange', tab)}>{tab}</button
				>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tabs {
		margin-bottom: 20px;
	}
	ul {
		display: flex;
		justify-content: center;
		list-style-type: none;
	}
	li {
		margin: 0 20px;
		font-size: 18px;
		color: #333;
		cursor: pointer;
	}
	.active {
		color: red;
		border-bottom: 2px solid red;
		padding-bottom: 10px;
	}
	button {
		all: unset;
		display: inline-block;
		cursor: pointer;
		font-weight: bolder;
	}
</style>
