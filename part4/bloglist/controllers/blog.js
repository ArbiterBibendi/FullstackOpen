const express = require('express');
const Router = new express.Router();
const Blog = require('../models/blog');


Router.get('/', (request, response) => {
  Blog
      .find({})
      .then((blogs) => {
        response.json(blogs);
      });
});

Router.post('/', (request, response) => {
  const blog = new Blog(request.body);

  console.log(request.body);

  blog
      .save()
      .then((result) => {
        response.status(201).json(result);
      });
});

module.exports = Router;
