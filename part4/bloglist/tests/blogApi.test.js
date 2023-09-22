const mongoose = require('mongoose');
const {initialBlogs} = require('../utils/api_test_helper');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    await new Blog(blog).save();
  }
});

test('GET /api/blogs returns correct amount of notes', async () => {
  const blogs = (await api.get('/api/blogs')).body;
  console.log(blogs);
  expect(blogs.length).toBe(initialBlogs.length);
});

test('every blog has a field named \'id\'', async () => {
  const blogs = (await api.get('/api/blogs')).body;
  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});


afterAll(() => {
  mongoose.connection.close();
});
