const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');



beforeEach(async () => {
	await Note.deleteMany({});

	
	for (let note of helper.initialNotes)
	{
		const noteObject = new Note(note);
		await noteObject.save();
	}
});

const api = supertest(app);

test('all notes are returned', async () => {
	const response = await api.get('/api/notes');
  
	expect(response.body).toHaveLength(helper.initialNotes.length);
});
  
test('a specific note is within the returned notes', async () => {
	const response = await api.get('/api/notes');
  
	const contents = response.body.map(r => r.content);
	expect(contents).toContain(
		'Browser can execute only JavaScript'
	);
});

test('a valid note can be added', async () => {
	const noteContent = 'async/await simplifies making async calls';
	const newNote = {
		content: noteContent,
		important: true,
	};

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const notesAtEnd = await helper.notesInDb();
	expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

	
	const contents = notesAtEnd.map(r => r.content);
	expect(contents).toContain(noteContent);
});

test('note without content is not added', async () => {
	const newNote = {
		important: true
	};

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(400);

	const response = await api.get('/api/notes');

	expect(response.body).toHaveLength(helper.initialNotes.length);
});

afterAll(async () => {
	await mongoose.connection.close();
});