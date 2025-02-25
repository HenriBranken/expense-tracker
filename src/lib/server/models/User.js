// lib/server/models/User.js

import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const userSchema = new Schema(
	{
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
		collection: 'users'
	}
);

// Added the `||` for hot-reload.
export default mongoose.models.User || mongoose.model('User', userSchema);
