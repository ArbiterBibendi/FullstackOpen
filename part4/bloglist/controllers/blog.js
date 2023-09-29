const express = require('express');
const blogRouter = new express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
      .find({})
      .populate('user', {username: true, name: true});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  // Assign a random user to each submitted blog for now
  usersInDb = await User.find({});
  const randomIndex = Math.floor(Math.random() * usersInDb.length);
  const randomUser = usersInDb[randomIndex];
  const randomUserId = randomUser._id;

  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: randomUserId,
  };
  const blogModel = new Blog(blogObject);
  const result = await blogModel.save();

  randomUser.blogs = randomUser.blogs.concat(result._id);
  await randomUser.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const returnedBlog = await Blog.findByIdAndUpdate(
      id,
      newBlog,
      {
        new: true,
        runValidators: true,
      },
  );
  response.status(200).send(returnedBlog);
});

module.exports = blogRouter;
