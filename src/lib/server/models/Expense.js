import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const expenseSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true,
		set: (value) => parseFloat(value.toFixed(2)) // ensure 2 decimal places.
	},
	description: {
		type: String,
		required: true,
		default: 'Unspecified Description'
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	}
});

// Convert Schema to a Model:
const expenseModel = mongoose.model('Expense', expenseSchema);

// Added the `||` for hot-reload.
export default mongoose.models.Expense || expenseModel;
