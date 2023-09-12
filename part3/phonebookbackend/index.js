const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body)
    ].join(' ');
}));

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response) => {
    response.json(phonebook);
});
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find((person) => person.id === id);
    if (!person) {
        return response.status(404).end()
    }
    response.json(person);
});
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${phonebook.length} people</p>` +
        `<p>${Date()}</p>`
    );
});
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter((person) => person.id !== id);
    response.status(202);
    response.end();
});
app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name) {
        response.status(400);
        return response.json({ error: 'name is missing' });
    }
    else if (!body.number) {
        response.status(400);
        return response.json({ error: 'number is missing' });
    }
    else if (phonebook.find((person) => person.name.toLowerCase() == body.name.toLowerCase())) {
        response.status(400);
        return response.json({ error: 'name must be unique' });
    }
    const person = {
        name: body.name,
        id: Math.floor(Math.random() * 999999999999999),
        number: body.number
    }
    phonebook = phonebook.concat(person);
    response.send(person);
});


app.listen(3001, () => {
    console.log('Listening');
});
