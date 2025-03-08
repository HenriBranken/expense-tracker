import User from '$lib/server/models/User';
import { connectDB } from '$lib/server/db';
import { signIn } from '@auth/sveltekit/webauthn';

export async function POST({ request }) {
	await connectDB();

	const { email, password } = await request.json();

	const user = await User.findOne({ email });
	if (!user || !(await user.comparePassword(password))) {
		return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
	}

	/**
	 * Initiate a sign-in process using the "credentials" provider.
	 *    "credentials" = {email, password} authentication (as opposed to OAuth providers)
	 *
	 * email --> passes the user's email to Auth.js for authentication.
	 * redirect: false --> Prevent the browser from redirecting to another page after signing in.
	 */
	return signIn('credentials', { email, redirect: false });
}
