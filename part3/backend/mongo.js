const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://bibendi:${password}@cluster0.nf3xyqx.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is easy',
    important: true
});


Note.find({}).then(result => {
    result.forEach(note => console.log(note));
    mongoose.connection.close();
});