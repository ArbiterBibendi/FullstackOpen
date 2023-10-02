const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
  initialBlogs,
  newBlog,
  likelessBlog,
  titlelessBlog,
  urllessBlog,
  getAll,
} = require('../utils/api_test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
let authToken = null;
let testUserId = null;
const postWithAuthorization = async (url, content) => {
  return await api.post(url).send(content).auth(authToken, {type: 'bearer'});
};
const deleteWithAuthorization = async (url) => {
  return await api.delete(url).auth(authToken, {type: 'bearer'});
};

beforeAll(async () => {
  await User.deleteMany({});
  const userModel = new User({
    username: 'automated_test_user',
    passwordHash: 'itdoesntmatter',
    name: 'automated_test_user_name',
  });
  const user = await userModel.save();
  const userForToken = {
    username: user.username,
    id: user.id,
  };

  authToken = jwt.sign(userForToken, process.env.JWT_SECRET);
  testUserId = user.id;
});
beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    blog.user = testUserId;
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
  await postWithAuthorization('/api/blogs', newBlog);
  const returnedBlogs = await getAll(Blog);

  expect(returnedBlogs).toContainEqual(expect.objectContaining(newBlog));
});

test('validation of \'likes\' field existence', async () => {
  const response = await postWithAuthorization('/api/blogs', likelessBlog);
  const returnedBlog = response.body;

  expect(returnedBlog.likes).toBeDefined();
});

test('missing url or title returns http code 400', async () => {
  let response = await postWithAuthorization('/api/blogs', titlelessBlog);
  expect(response.status).toEqual(400);
  response = await postWithAuthorization('/api/blogs', urllessBlog);
  expect(response.status).toEqual(400);
});

test('DELETE /api/blogs/:id removes blog from database and returns 204',
    async () => {
      let blogsInDb = await getAll(Blog);
      const firstBlog = blogsInDb[0];
      const response = await deleteWithAuthorization(
          `/api/blogs/${firstBlog.id}`,
      );
      blogsInDb = await getAll(Blog);

      expect(response.status).toBe(204);
      expect(blogsInDb).not.toContainEqual(firstBlog);
    },
);

test('PUT /api/blogs/:id updates blog and returns 200', async () => {
  const oldBlogs = await getAll(Blog);
  const oldBlog = oldBlogs[0];
  const response = await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send({...oldBlog, likes: oldBlog.likes+1});
  const newBlog = (await Blog.findById(oldBlog.id)).toJSON();
  expect(response.status).toBe(200);
  expect(newBlog).toMatchObject({...oldBlog, likes: oldBlog.likes+1});
});

afterAll(async () => {
  await mongoose.connection.close();
});
