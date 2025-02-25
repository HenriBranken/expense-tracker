// lib/routes/api/auth/+server.js

import { json } from '@sveltejs/kit';
import { User } from '$lib/server/db';
import { lucia } from '$lib/server/auth';

/**
 * Handle POST requests for login and logout in a single route.
 */
export async function POST({ request, cookies }) {
	const { action, username, password } = await request.json();

	if (action === 'login') {
		return await handleLogin(username, password, cookies);
	}

	if (action === 'logout') {
		return await handleLogout(cookies);
	}

	// The POST request failed.
	return json({ error: 'Invalid action' }, { status: 400 });
}

/**
 * Handles user login.
 */
async function handleLogin(username, password, cookies) {
	const user = await User.findOne({ username: username, password: password });

	// TODO: use bcryptjs for password validation.

	if (!user) {
		return json({ error: 'Invalid username or password' }, { status: 400 });
	}

	// Create session
	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	// "auth_session", unique identifier, object containing cookie settings
	cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return json({ success: true });
}

/**
 * Handles user logout.
 */
async function handleLogout(cookies) {
	const sessionId = cookies.get('auth_session');
	if (sessionId) {
		await lucia.invalidateSession(sessionId);
		cookies.delete('auth_session');
	}
	return json({ success: true });
}
