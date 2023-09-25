const express = require('express');
const Router = new express.Router();
const Blog = require('../models/blog');
require('express-async-errors');

Router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

Router.post('/', async (request, response) => {
  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
  };
  const blogModel = new Blog(blogObject);
  const result = await blogModel.save();
  response.status(201).json(result);
});

Router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = Router;
