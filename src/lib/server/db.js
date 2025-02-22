// lib/server/db.js

import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';

export async function connectDB() {
	// Prevent redundant connection.
	if (mongoose.connection.readyState >= 1) {
		console.log('MongoDB Connection already up and running.');
		return;
	}

	try {
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB Connected');
	} catch (err) {
		console.error(`MongoDB Connection Error: ${err}`);
	}
}
