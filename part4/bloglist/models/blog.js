const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
},
{
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
    },
  },
  versionKey: null,
},
);
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
