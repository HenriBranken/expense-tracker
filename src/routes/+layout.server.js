import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/login'); // Redirects if user is not logged in
	}

	return {
		user: locals.user
	};
};
