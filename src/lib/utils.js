import { expenseSchema } from '$lib/expenseZodSchema';

export const generateTodayString = () => new Date().toISOString().split('T')[0];
export const createDateString = (dateString) => {
	let date = new Date(dateString);
	date.setDate(date.getDate() + 1);
	return date.toISOString().split('T')[0];
};

// Validate the form inputs (when adding / editing expenses)
export const validateForm = (errorMsgs, fields) => {
	errorMsgs = { ...errorMsgs, title: '', description: '', date: '', amount: '' };

	const result = expenseSchema.safeParse(fields); // Don't throw errors when validation fails.

	// Handle the errors if the validation failed:
	if (!result.success) {
		// acc is the accumulator.
		errorMsgs = result.error.issues.reduce((acc, issue) => {
			acc = { ...acc, [issue.path[0]]: issue.message };
			return acc;
		}, {});
		return { boolVal: false, errorMsgs };
	}
	return { boolVal: true, errorMsgs };
};

// The error messages related to the ExpenseForm2.svelte component.
export let errorMsgsInit = {
	title: '',
	description: '',
	date: '',
	amount: ''
};
