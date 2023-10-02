const express = require('express');
const loginRouter = new express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;
  if (!username || !password) {
    throw Error('missing username or password');
  }
  const user = await User.findOne({username: username});
  const passwordHash = user?.passwordHash;

  const isPasswordValid = (passwordHash != undefined) ?
    await bcrypt.compare(password, passwordHash) :
    null;

  if (!user || !isPasswordValid) {
    response.status(401).json({error: 'incorrect username or password'});
    return;
  }

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  response.status(200).json({token, username, name: user.name});
});

module.exports = loginRouter;
