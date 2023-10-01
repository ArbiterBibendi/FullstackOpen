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

module.exports = {
  errorHandler,
};
