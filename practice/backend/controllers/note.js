const notesRouter = require('express').Router();
const Note = require('../models/note');
require('express-async-errors');

notesRouter.get('/', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes);
	});
});

notesRouter.post('/', async (request, response) => {
	const body = request.body;
  
	const note = new Note({
		content: body.content,
		important: body.important || false,
	});
  
	const savedNote = await note.save();
	response.status(201).json(savedNote);
});
  
notesRouter.get('/:id', async (request, response) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

notesRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then(updatedNote => {
			response.json(updatedNote);
		})
		.catch(error => next(error));
});

module.exports = notesRouter;