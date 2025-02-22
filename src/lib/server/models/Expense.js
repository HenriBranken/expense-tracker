// lib/server/models/Expense.js

import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const expenseSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		amount: {
			type: Number,
			required: true,
			min: 0.01
		},
		description: {
			type: String,
			required: true,
			default: 'Unspecified Description'
		},
		date: {
			type: Date,
			required: true,
			set: (value) => {
				const dateObj = new Date(value);
				return isNaN(dateObj) ? undefined : dateObj; // Ensure a valid Date object is stored
			},
			get: (value) => {
				return new Intl.DateTimeFormat('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				}).format(value);
			}
		}
	},
	{
		collection: 'expenses',
		toJSON: { getters: true },
		toObject: { getters: true }
	}
);

// Added the `||` for hot-reload.
export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
