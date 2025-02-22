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
		return new Response(
			JSON.stringify({
				error: `Could not add a new expense. See error message below:\n${error.message}`
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
