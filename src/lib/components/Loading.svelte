<div class="loading-backdrop">
	<div class="spinner"></div>
</div>

<style>
	.loading-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 1000;
	}

	.spinner {
		width: 80px;
		height: 80px;
		border: 12px solid rgba(255, 255, 255, 0.5);
		border-top: 12px solid white;
		border-radius: 50%;
		animation: spin 1000ms linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
