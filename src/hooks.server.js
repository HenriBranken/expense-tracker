// src/hooks.server.js --> Middleware
// To restrict certain routes to logged-in users.

import { lucia } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	// Retrieve the session ID.
	const sessionId = event.cookies.get('auth_session') || null;
	if (sessionId) {
		// Validate the session using Lucia.
		//    If Valid, fetch the corresponding user from the database.
		//    Else, user will be null.
		// Store the `user` in event.locals
		//    `user` is available to every request and load function.
		//    Allow pages and API to easily access the logged-in user.
		try {
			const { user } = await lucia.validateSession(sessionId);
			event.locals.user = user || null;
		} catch (error) {
			console.error(`Inside the hooks.server.js, the session validation failed:\n${error}.`);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}
	// Process the request | Allow the request to "continue" after passing this middleware.
	return resolve(event);
}
