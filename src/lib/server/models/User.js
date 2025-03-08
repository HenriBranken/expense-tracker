import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
		},
		hashedPassword: {
			type: String,
			required: true
		}
	},
	{
		collection: 'users',
		timestamps: true // `createdAt` and `updatedAt` timestamps.
	}
);

// Pre-save hook to hash passwords before storing them
userSchema.pre('save', async function (next) {
	if (!this.isModified('hashedPassword')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt); // hashed version.
		next();
	} catch (error) {
		next(error);
	}
});

// Method to compare entered password with stored hash
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.hashedPassword); // compare user-entered password.
};

// Export the model:
export default mongoose.models.User || mongoose.model('User', userSchema);
