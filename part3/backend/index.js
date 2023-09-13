require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express()
app.use(express.static('dist'));
app.use(cors());
app.use(express.json())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}
app.use(requestLogger);




let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    });
});
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note);
            }
            else {
                response.status(404).end();
            }
        })
        .catch((e) => {
            next(e);
        });
});
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then((result => {
            return response.status(204).end();
        }))
        .catch(e => next(e))
});
app.post('/api/notes', (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.json({ error: 'missing content' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    });
    note.save().then(note => {
        response.json(note);
    });
});
app.put('/api/notes/:id', (request, response, next) => {
    const note = {
        content: request.body.content,
        important: request.body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(result => response.json(result))
        .catch(e => next(e));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});