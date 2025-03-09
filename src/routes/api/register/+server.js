/**
 * Handles new registration.
 * Hashes the password and stores it inside MongoDB.
 *
 * SvelteKitAuth() doesn't handle User Registration.
 */

import User from '$lib/server/models/User';
import { connectDB } from '$lib/server/db'; // Ensure the DataBase Connection

export async function POST({ request }) {
	await connectDB();

	const { email, password } = await request.json();

	// 400: Malformed request syntax.
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 400 });
	}

	const newUser = new User({ email, hashedPassword: password });
	await newUser.save();

	// 201 --> Created Status Code
	return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
}
