// src/hooks.server.js --> Middleware
// To restrict certain routes to logged-in users.

import { auth } from '$lib/server/auth';

export const handle = async ({ event, resolve }) => {
	// we can pass `event` because we use the sveltekit middleware
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
