const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({error: error.message});
  } else {
    logger.error(error.message);
    response.status(500).json({error: 'Lo siento ;('});
  }
  next(error);
};

const getToken = (request) => {
  const authorization = request.get('Authorization');
  const bearerRegex = /^Bearer /i;
  let token = undefined;
  if (bearerRegex?.test(authorization)) {
    token = authorization.replace(bearerRegex, '');
  }
  return token;
};
const tokenExtractor = (request, response, next) => {
  request.token = getToken(request);
  next();
};

const userExtractor = async (request, response, next) => {
  const token = getToken(request);
  if (!token) {
    next();
    return;
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(verifiedToken.id);
  request.user = user;
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
