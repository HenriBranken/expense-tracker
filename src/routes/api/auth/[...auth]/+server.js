/**
 * GET  --> /api/auth/session     Retrieve Session Info
 * POST --> /api/auth/signin      Authentication and start session
 * POST --> /api/auth/signout     Destroy Session
 *
 * Session Management is handled automatically by SvelteKitAuth();
 */

import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '$lib/server/models/User';
import { connectDB } from '$lib/server/db';

// Ensure we connect to the Database:
await connectDB();

export const { GET, POST } = SvelteKitAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', required: true },
				password: { label: 'Password', type: 'password', required: true }
			},
			async authorize(credentials) {
				// Find the User:
				const user = await User.findOne({ email: credentials.email });

				if (!user) {
					throw new Error('User not found.');
				}

				// Compare the entered password with the stored hash:
				const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

				if (!isValid) {
					throw new Error('Invalid Credentials.');
				}

				// Return the user details for session storage:
				return { id: user._id, email: user.email };
			}
		})
	],
	secret: process.env.AUTH_SECRET
});
