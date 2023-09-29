const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({error: 'Malformatted Data'});
  } else {
    logger.error(error.message);
  }
  mongoose.connection.close();
  next(error);
};

module.exports = {
  errorHandler,
};
