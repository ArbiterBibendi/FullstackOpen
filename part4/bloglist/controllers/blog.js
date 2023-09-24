const express = require('express');
const Router = new express.Router();
const Blog = require('../models/blog');


Router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

Router.post('/', async (request, response) => {
  if (request.body.likes === undefined) {
    request.body.likes = 0;
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = Router;
