const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
},
{
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.passwordHash;
      delete returnedObject.__v;
    },
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
