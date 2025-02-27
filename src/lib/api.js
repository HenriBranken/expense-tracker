// lib/api.js

import axios from 'axios';
// import { EXPENSE_API_URL } from '$env/static/private';

const EXPENSE_API_URL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:5173/api/expenses' : '/api/expenses';

// Fetch all expenses.
export const fetchExpenses = async () => {
	try {
		const { data } = await axios.get(EXPENSE_API_URL);
		return data;
	} catch (error) {
		console.error(
			`Error fetching expenses from UI. See following error message:\n${error.message}`
		);
		return [];
	}
};

// Add a new expense.
export const addExpense = async (expense) => {
	try {
		console.log(`The node environment is ${process.env.NODE_ENV}.`);
		console.log(
			`Inside lib/api.js, inside addExpense, title = ${expense.title} description = ${expense.description} date = ${expense.date} amount = ${expense.amount} ${typeof expense.amount}.`
		);
		const { data } = await axios.post(EXPENSE_API_URL, expense);
		return data;
	} catch (error) {
		console.error(
			`Error adding expense from UI. Please see following error message:\n${error.message}`
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
		console.error(
			`Error deleting expense from UI. See the following error message:\n${error.message}`
		);
		return null;
	}
};

export const editExpense = async (updatedExpense) => {
	try {
		console.log(`Trying to update the expense with id:  ${updatedExpense._id}.`);
		const { data } = await axios.put(EXPENSE_API_URL, updatedExpense);
		return data;
	} catch (error) {
		console.error(
			`From lib/api.js, inside editExpense function, the following error occurred:\n${error.message}`
		);
		return null;
	}
};
