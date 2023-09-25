const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({error: 'Malformatted Blog'});
  } else {
    logger.error(error.message);
  }
  next(error);
};

module.exports = {
  errorHandler,
};