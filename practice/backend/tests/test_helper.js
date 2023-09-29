const Note = require('../models/note');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const initialNotes = [
	{
		content: 'HTML is easy',
		important: false
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true
	}
];

const nonExistingId = async () => {
	const note = new Note({content: 'willremovethissoon'});
	await note.save();
	await note.deleteOne();

	return note._id.toString();
};

const notesInDb = async () => {
	const notes = await Note.find({}).populate('user', {username: 1, name: 1});
	return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({}).populate('notes', {content: 1, important: 1});
	return users.map(user => user.toJSON());
};

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
	usersInDb,
};