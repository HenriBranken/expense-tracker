// lib/server/models/User.js

import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const sessionSchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		active_expires: {
			type: Number,
			required: true
		},
		idle_expires: {
			type: Number,
			required: true
		}
	},
	{
		collection: 'users',
		_id: false
	}
);

// Added the `||` for hot-reload.
export default mongoose.models.Session || mongoose.model('Session', sessionSchema);
