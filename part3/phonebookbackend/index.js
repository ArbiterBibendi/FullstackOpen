require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
const app = express();
app.use(cors());
app.use(express.static('dist'));
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


app.get('/api/persons', (request, response) => {
    console.log(response);
    Person.find({}).then((results) => {
        response.json(results);
    });
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
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(e => esponse.status(500).end());
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
    const person = new Person({
        name: body.name,
        number: body.number
    });
    person.save().then(result => {
        response.json(result);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
