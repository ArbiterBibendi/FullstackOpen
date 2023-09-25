const mongoose = require('mongoose');
const {
  initialBlogs,
  newBlog,
  likelessBlog,
  titlelessBlog,
  urllessBlog,
  getAll,
} = require('../utils/api_test_helper');
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
  expect(blogs.length).toBe(initialBlogs.length);
});

test('every blog has a field named \'id\'', async () => {
  const blogs = await getAll(Blog);
  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test('POST /api/blogs correctly saves blog', async () => {
  await api.post('/api/blogs').send(newBlog);
  const returnedBlogs = await getAll(Blog);

  expect(returnedBlogs).toContainEqual(expect.objectContaining(newBlog));
});

test('validation of \'likes\' field existence', async () => {
  const response = await api.post('/api/blogs').send(likelessBlog);
  const returnedBlog = response.body;

  expect(returnedBlog.likes).toBeDefined();
});

test('missing url or title returns http code 400', async () => {
  let response = await api.post('/api/blogs').send(titlelessBlog);
  expect(response.status).toEqual(400);
  response = await api.post('/api/blogs').send(urllessBlog);
  expect(response.status).toEqual(400);
});

test('DELETE /api/blogs/:id removes blog from database and returns 204',
    async () => {
      let blogsInDb = await getAll(Blog);
      const firstBlog = blogsInDb[0];
      const response = await api.delete(`/api/blogs/${firstBlog.id}`);
      blogsInDb = await getAll(Blog);

      expect(response.status).toBe(204);
      expect(blogsInDb).not.toContainEqual(firstBlog);
    },
);

test('PUT /api/blogs/:id updates blog and returns 200', async () => {
  const oldBlogs = await getAll(Blog);
  const oldBlog = oldBlogs[0];
  const response = await api.put(`/api/blogs/${oldBlog.id}`).send(
      {...oldBlog, likes: oldBlog.likes+1},
  );
  const newBlog = (await Blog.findById(oldBlog.id)).toJSON();
  expect(newBlog).toMatchObject({...oldBlog, likes: oldBlog.likes+1});
  expect(response.status).toBe(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
