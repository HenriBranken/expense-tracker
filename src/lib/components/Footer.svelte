<script>
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="copyright">&copy; {currentYear} Expense Tracker. All rights reserved.</div>
</footer>

<style>
	footer {
		margin-top: auto;
		width: 100%;
		text-align: center;
		background: #f8f8f8;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 15px;
		border-top: solid #999 1px;
	}

	.copyright {
		font-size: 12px;
		color: #666;
	}
</style>
