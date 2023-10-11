const express = require('express');
const blogRouter = new express.Router();
const Blog = require('../models/blog');

require('express-async-errors');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
      .find({})
      .populate('user', {username: true, name: true});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const user = request.user;
  if (!user) {
    response.status(401).json({error: 'not logged in'});
    return;
  }

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
  const blog = await Blog.findById(id);
  const user = request.user;

  if (user?.id?.toString() !== blog?.user?.toString()) {
    response.status(401).json({error: 'not authorized'});
    return;
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

/* likes only for now */
blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const blogToReplace = await Blog.findById(id);

  blogToReplace.likes = body.likes;

  await blogToReplace.save();
  response.status(200).json(blogToReplace);
});

module.exports = blogRouter;
