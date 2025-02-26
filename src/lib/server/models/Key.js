// lib/server/models/User.js

import mongoose, { Schema } from 'mongoose';

// Define the expense Schema.
const keySchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		hashed_password: {
			type: String,
			required: true
		},
		primary: {
			type: Boolean,
			required: true
		}
	},
	{
		collection: 'keys',
		_id: false
	}
);

// Added the `||` for hot-reload.
export default mongoose.models.Key || mongoose.model('Key', keySchema);
