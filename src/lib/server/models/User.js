// lib/server/models/User.js

import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const userSchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		collection: 'users',
		_id: false
	}
);

// Added the `||` for hot-reload.
export default mongoose.models.User || mongoose.model('User', userSchema);
