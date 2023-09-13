const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

const numberValidator = (value) => {
    const numberParts = value.split('-');
    const firstPartLengthValid = numberParts[0].length >= 2 && numberParts[0].length <= 3;
    const firstPartIsNumber = !isNaN(numberParts[0]);
    const secondPartIsNumber = !isNaN(numberParts[1]);
    const thirdPartExists = numberParts[2];
    if (
        firstPartLengthValid &&
        firstPartIsNumber &&
        secondPartIsNumber &&
        !thirdPartExists
    ) {
        return true;
    }
    return false;
}
const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: numberValidator,
        minLength: 8
    }
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