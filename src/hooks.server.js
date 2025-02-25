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
		const { user } = await lucia.validateSession(sessionId);

		// Store the `user` in event.locals
		//    `user` is available to every request and load function.
		//    Allow pages and API to easily access the logged-in user.
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}
	// Process the request | Allow the request to "continue" after passing this middleware.
	return resolve(event);
}
