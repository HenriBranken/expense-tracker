import { z } from 'zod';
import { generateTodayString } from './utils';

/*
 * preprocess()
 *          Convert val to a number using parseFloat(val).
 *          If it is already a number, leave unchanged.
 * positive()
 *          Ensure the amount is greater than 0.
 * amount.toFixed(2) === String(amount)
 *          If the number has decimals, it is limited to 2 decimal places.
 * Number.isInteger(amount)
 *          Allows whole numbers.
 */

// Define Zod schema
export const expenseSchema = z.object({
	title: z.string().min(2, 'Title must be at least 2 characters long.'),
	description: z.string().min(3, 'Description must be at least 3 characters long.'),
	date: z
		.string()
		.refine((date) => date.trim() !== '', { message: 'Date cannot be empty.' })
		.refine((date) => date <= generateTodayString(), { message: 'Future dates are not allowed.' }),
	amount: z.preprocess(
		(val) => (typeof val === 'string' ? parseFloat(val) : val),
		z
			.number()
			.positive('Amount must be a positive number.')
			.refine(
				(amount) =>
					amount.toFixed(2) === String(amount) ||
					amount.toFixed(1) === String(amount) ||
					Number.isInteger(amount),
				{
					message: 'Amount cannot have more than 2 decimal places.'
				}
			)
	)
});
