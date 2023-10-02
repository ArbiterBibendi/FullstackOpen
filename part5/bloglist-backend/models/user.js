const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username was not received'],
    unique: [true, 'Username must be unique'],
    minLength: [3, 'Username must be atleast 3 characters'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
    },
  ],
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
