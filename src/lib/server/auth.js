// src/lib/server/auth.js --> Configure Lucia Authentication.

import { Lucia } from 'lucia';
import { MongooseAdapter } from '@lucia-auth/adapter-mongoose'; // allow Lucia to use MongoDB as the database
import User from './models/User';

let envVal = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD';

/**
 * Set and configure Lucia authentication -> Connect Lucia to MongoDB.
 * Create a Lucia Authentication Instance
 * Map the MongoDB `User` data to Lucia's user format -> do not expense password information.
 *    Return a simplified user object:
 */

export const lucia = new Lucia({
	adapter: new MongooseAdapter(User),
	env: envVal,
	transformDatabaseUser: (user) => {
		return { userId: user._id, username: user.username };
	}
});

/**
 * The authentication object `lucia` is used in
 * login / signup / logout
 */
