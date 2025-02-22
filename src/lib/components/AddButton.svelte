<button class="add-expense-btn">Add Expense</button>

<style>
	.add-expense-btn {
		display: block;
		margin: 20px auto;
		padding: 12px 20px;
		border-radius: 8px;
		background: linear-gradient(135deg, #ff4d4d, #cc0000);
		color: white;
		font-size: 1.3rem;
		font-weight: bold;
		cursor: pointer;
		border: none;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		transition:
			background 0.3s,
			transform 0.2s,
			box-shadow 0.3s;
	}

	.add-expense-btn:hover {
		background: linear-gradient(135deg, #e60000, #a30000);
		box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
	}

	.add-expense-btn:active {
		box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
	}

	.add-expense-btn:focus {
		outline: 3px solid rgba(255, 77, 77, 0.6);
	}
</style>
