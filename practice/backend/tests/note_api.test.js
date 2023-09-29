const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Note = require('../models/note');
const User = require('../models/user');

let testUserToken = '';
beforeEach(async () => {
	await Note.deleteMany({});
	await User.deleteMany({});
	const returnedNotes = await Note.insertMany(helper.initialNotes);
	const testUserObject = {
		username: 'root',
		passwordHash: await bcrypt.hash('sekret', 10),
	};
	const testUser = User(testUserObject);
	const returnedUser = await testUser.save();

	for (const note of returnedNotes) {
		returnedUser.notes.concat(note.id);
		note.user = returnedUser.id;
		await note.save();
	}
	await testUser.save();
	const userForToken = {
		username: returnedUser.username,
		id: returnedUser._id,
	};

	testUserToken = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});
});
describe('when there is initially some notes saved', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

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
});

describe('viewing a specific note', () => {
	test('succeeds with a valid id', async () => {
		const notesAtStart = await helper.notesInDb();

		const noteToView = notesAtStart[0];

		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultNote.body).toEqual(noteToView);
	});

	test('fails with statuscode 404 if note does not exist', async () => {
		const validNonexistingId = await helper.nonExistingId();

		await api
			.get(`/api/notes/${validNonexistingId}`)
			.expect(404);
	});

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445';

		await api
			.get(`/api/notes/${invalidId}`)
			.expect(400);
	});
});

describe('addition of a new note', () => {
	test('succeeds with valid data', async () => {
		const newNote = {
			content: 'async/await simplifies making async calls',
			important: true,
		};

		await api
			.post('/api/notes')
			.auth(testUserToken, {type: 'bearer'})
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const notesAtEnd = await helper.notesInDb();
		expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

		const contents = notesAtEnd.map(n => n.content);
		expect(contents).toContain(
			'async/await simplifies making async calls'
		);
	});

	test('fails with status code 400 if data invalid', async () => {
		const newNote = {
			important: true
		};

		await api
			.post('/api/notes')
			.auth(testUserToken, {type: 'bearer'})
			.send(newNote)
			.expect(400);

		const notesAtEnd = await helper.notesInDb();

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
	});
});

describe('deletion of a note', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const notesAtStart = await helper.notesInDb();
		const noteToDelete = notesAtStart[0];

		await api
			.delete(`/api/notes/${noteToDelete.id}`)
			.auth(testUserToken, {type: 'bearer'})
			.expect(204);

		const notesAtEnd = await helper.notesInDb();

		expect(notesAtEnd).toHaveLength(
			helper.initialNotes.length - 1
		);

		const contents = notesAtEnd.map(r => r.content);

		expect(contents).not.toContain(noteToDelete.content);
	});
});



afterAll(async () => {
	await mongoose.connection.close();
});