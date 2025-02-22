import axios from 'axios';

const EXPENSE_API_URL = '/api/expenses';

// Fetch all expenses.
export const fetchExpenses = async () => {
	try {
		const { data } = await axios.get(EXPENSE_API_URL);
		return data;
	} catch (error) {
		console.error(`Error fetching expenses in UI. See following error message:\n${error.message}`);
		return [];
	}
};

// Add a new expense.
export const addExpense = async (expense) => {
	try {
		const { data } = await axios.post(EXPENSE_API_URL, expense);
		return data;
	} catch (error) {
		console.error(
			`Error adding expense in UI. Please see following error message:\n${error.message}`
		);
		return null;
	}
};

// Delete an expense by ID
export const deleteExpense = async (id) => {
	try {
		const { data } = await axios.delete(EXPENSE_API_URL, { data: { id } });
		return data;
	} catch (error) {
		console.error(`Error deleting expense. See the following error message:\n${error.message}`);
		return null;
	}
};
