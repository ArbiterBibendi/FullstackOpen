require('express-async-errors');
const express = require('express');
const User = require('../models/user');
const userRouter = new express.Router();
const bcrypt = require('bcryptjs');

userRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username,
    name,
    passwordHash,
  };
  const userModel = new User(user);
  const returnedUser = await userModel.save();
  response.status(201).json(returnedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.set(200).json(users);
});

module.exports = userRouter;
