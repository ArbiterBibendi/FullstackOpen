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


app.get('/api/persons', (request, response, next) => {
    Person
        .find({}).then((results) => {
            response.json(results);
        })
        .catch(e => next(e));
});
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person);
        })
        .catch(e => next(e));
});
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${phonebook.length} people</p>` +
        `<p>${Date()}</p>`
    );
});
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(e => next(e));
});
app.post('/api/persons', (request, response, next) => {
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
    person
        .save().then(result => {
            response.json(result);
        })
        .catch(e => next(e));
});
app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(result => response.json(result))
        .catch(e => next(e));
});

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    switch (error.name) {
        case 'ValidationError':
            response.status(400).send(error.message);
            break;
        default:
            response.status(500).send(error.message);
    }
    next(error);
}
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
