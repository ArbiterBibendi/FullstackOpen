const logger = require('./logger');

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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  const bearerRegex = /^Bearer /i;
  if (bearerRegex?.test(authorization)) {
    request.token = authorization.replace(bearerRegex, '');
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
