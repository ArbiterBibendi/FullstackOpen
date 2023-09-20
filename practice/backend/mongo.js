const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit();
}

const url = process.env.TEST_MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

Note.find({}).then(result => {
	result.forEach(note => console.log(note));
	mongoose.connection.close();
});