<script>
	import { getContext } from 'svelte';
	const handleEditExpense = getContext('handleEditExpense');

	export let expenseId;
	export let isEditing = false;
	export let onClick;
</script>

<button on:click={onClick} class="edit-btn"
	>{#if isEditing}
		&#x21BA;
	{:else}
		&#9998;
	{/if}</button
>

<style>
	.edit-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: none;
		background: #ff9800;
		color: white;
		font-size: 1.2rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.1s;
	}

	.edit-btn:hover {
		background: #e68900;
	}

	.edit-btn:active {
		transform: scale(0.9);
	}

	.edit-btn:focus {
		outline: 2px solid rgba(255, 152, 0, 0.6);
	}
</style>
