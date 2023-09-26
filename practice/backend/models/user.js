const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note',
		}
	]
});

userSchema.set('toJSON', {
	transform: (document, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		delete ret.passwordHash;
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;