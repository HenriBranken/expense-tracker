import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
	if (mongoose.connection.readyState === 1) return;

	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connected');
	} catch (err) {
		console.error('MongoDB Connection Error:', err);
	}
}
