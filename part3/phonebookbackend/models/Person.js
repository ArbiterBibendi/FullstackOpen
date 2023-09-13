const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be atleast 3 characters'],
        required: true
    },
    number: String
});
mongoose.set('strictQuery', false);
mongoose.connect(URL).then(() => {
    console.log('connected to MongoDB');
});

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})
const Person = mongoose.model('Person', personSchema);

module.exports = Person;