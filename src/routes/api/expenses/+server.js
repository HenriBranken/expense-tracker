// routes/api/expenses/+server.js

import { connectDB } from '$lib/server/db.js';
import Expense from '$lib/server/models/Expense.js';

// GET: Fetch all the expenses.
// 200 -> Success.
// 500 -> Internal Server Error | Server cannot fulfill the request.
export async function GET() {
	await connectDB();
	try {
		return new Response(JSON.stringify(await Expense.find({})), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: `Could not get expenses.  See error message below:\n${error.message}`
			}),
			{ status: 500 }
		);
	}
}

// POST: Add a new expense
// 201 -> Created.
// 500 -> Internal Server Error | Server cannot fulfill the request.
export async function POST({ request }) {
	await connectDB();
	try {
		const expense = await Expense.create(await request.json());
		return new Response(JSON.stringify(expense), { status: 201 });
	} catch (error) {
		console.error(`Could not add a new expense. See error message below:\n${error.message}`);
		return new Response(
			JSON.stringify({
				error: `Could not add a new expense. See error message below:\n${error.message}`
			}),
			{ status: 500 }
		);
	}
}

// PUT: Update an existing expense
// 200 -> Success.
// 400 -> Bad Request.
// 404 -> not found
// 500 -> Internal Server Error | Server cannot fulfill the request.
export async function PUT({ request }) {
	await connectDB();
	try {
		const { _id, title, description, date, amount } = await request.json();

		// Cannot extract an identifier from the request object.
		if (!_id) {
			return new Response(JSON.stringify({ error: 'Expense ID is required.' }), { status: 400 });
		}

		const updatedExpense = await Expense.findByIdAndUpdate(
			_id,
			{ title, description, date, amount },
			{ new: true, runValidators: true } // return the new document & enforce Schema validation
		);

		// Could not update the expense for whatever reason.
		if (!updatedExpense) {
			return new Response(JSON.stringify({ error: 'Could not find/update the expense' }), {
				status: 404
			});
		}
		return new Response(JSON.stringify(updatedExpense), { status: 200 });
	} catch (error) {
		console.error(
			`Could not update an existing expense. See error message below:\n${error.message}`
		);
		return new Response(
			JSON.stringify({
				error: `Could not update an existing expense. See error message below:\n${error.message}`
			}),
			{ status: 500 }
		);
	}
}

// DELETE: Remove an Expense
// 200 -> Success.
// 404 -> Expense not found
// 500 -> Internal Server Error | Server cannot fulfill the request.
export async function DELETE({ request }) {
	await connectDB();
	try {
		const { id } = await request.json();
		if (!id) throw new Error('Expense ID is required');

		const deletedExpense = await Expense.findByIdAndDelete(id);
		if (!deletedExpense) {
			return new Response(JSON.stringify({ error: 'Expense not found' }), { status: 404 });
		}

		return new Response(JSON.stringify({ message: 'Deleted', id }), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: `Could not delete an expense. See error message below:\n${error.message}`
			}),
			{ status: 500 }
		);
	}
}
