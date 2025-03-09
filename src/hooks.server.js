import { SvelteKitAuth } from '@auth/sveltekit';
import CredentialsProvider from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '$lib/server/models/User';
import { connectDB } from '$lib/server/db';

// Ensure database connection
await connectDB();

export const handle = SvelteKitAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', required: true },
				password: { label: 'Password', type: 'password', required: true }
			},
			async authorize(credentials) {
				const user = await User.findOne({ email: credentials.email });

				if (!user) {
					throw new Error('User not found.');
				}

				const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
				if (!isValid) {
					throw new Error('Invalid Credentials.');
				}

				return { id: user._id, email: user.email };
			}
		})
	],
	secret: process.env.AUTH_SECRET
});
