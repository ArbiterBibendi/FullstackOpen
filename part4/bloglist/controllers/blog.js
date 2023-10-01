const express = require('express');
const blogRouter = new express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('express-async-errors');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
      .find({})
      .populate('user', {username: true, name: true});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  if (!request.token) {
    response.status(401).json({error: 'not logged in'});
    return;
  }
  const userFromToken = jwt.verify(request.token, process.env.JWT_SECRET);
  const user = await User.findById(userFromToken?.id);
  if (!user) {
    throw new Error('could not find user');
  }
  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: user.id,
  };
  const blogModel = new Blog(blogObject);
  const result = await blogModel.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();
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
