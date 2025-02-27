<script>
	export let onClick;
</script>

<button on:click={onClick} class="save-btn">&#10003;</button>

<style>
	.save-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: none;
		background: #4caf50; /* Green color */
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.1s;
	}

	.save-btn:hover {
		background: #388e3c;
	}

	.save-btn:active {
		transform: scale(0.9);
	}

	.save-btn:focus {
		outline: 2px solid rgba(76, 175, 80, 0.6);
	}
</style>
