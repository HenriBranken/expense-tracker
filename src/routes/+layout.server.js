import { redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
	if (!locals.user && url.pathname !== '/login') {
		throw redirect(307, '/login'); // Redirects if user is not logged in
	}

	return {
		user: locals.user
	};
};
