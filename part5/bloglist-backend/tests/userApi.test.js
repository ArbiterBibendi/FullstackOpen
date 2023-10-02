const mongoose = require('mongoose');
const {
  initalUser,
  validNewUser,
  invalidUsers,
} = require('../utils/api_test_helper');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const newUser = new User(initalUser);
  await newUser.save();
});

describe('when one user is in the db', () => {
  test('valid user returns 201 with user', async () => {
    const response = await api.post('/api/users').send(validNewUser);
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(validNewUser.username);
    expect(response.body.name).toEqual(validNewUser.name);
    expect(response.body.id).toBeDefined();
  });

  test('invalid users return 400 with error message', async () => {
    for (const invalidUser of invalidUsers) {
      const response = await api.post('/api/users').send(invalidUser);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
