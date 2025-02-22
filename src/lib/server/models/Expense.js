import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const expenseSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		amount: {
			type: Schema.Types.Decimal128,
			required: true,
			min: 0,
			set: (value) => Schema.Types.Decimal128.fromString(value.toFixed(2)), // Stores as Decimal128
			get: (value) => parseFloat(value.toString()) // Convert back to readable format
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
	},
	{ collection: 'expenses' }
);

// Convert Schema to a Model:
const expenseModel = mongoose.model('Expense', expenseSchema);

// Added the `||` for hot-reload.
export default mongoose.models.Expense || expenseModel;
