// src/lib/server/auth.js --> Configure Lucia Authentication.
// https://v2.lucia-auth.com/database-adapters/mongoose/
// https://v2.lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit/
// https://v2.lucia-auth.com/database-adapters/mongoose/#usage

import { lucia } from 'lucia';
// import { mongoose } from '@lucia-auth/adapter-mongoose'; // allow Lucia to use MongoDB as the database
import adapter from '@lucia-sveltekit/adapter-mongoose';
import { sveltekit } from 'lucia/middleware';
import User from './models/User';
import Key from './models/Key';
import Session from './models/Session';
import mongoose from 'mongoose';

let envVal = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'; // http vs https

/**
 * Set and configure Lucia authentication -> Connect Lucia to MongoDB.
 * Create a Lucia Authentication Instance
 * Map the MongoDB `User` data to Lucia's user format -> do not expense password information.
 *    Return a simplified user object:
 */

export const auth = lucia({
	adapter: adapter(mongoose),
	env: envVal,
	middleware: sveltekit(),
	getUserAttributes: (user) => {
		return { userId: user._id, username: user.username };
	}
});

/**
 * The authentication object `lucia` is used in
 * login / signup / logout
 */
