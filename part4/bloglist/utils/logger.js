const log = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('info:', ...args);
  }
};

const error = (...args) => {
  console.error('logerror:', ...args);
};

module.exports = {
  log,
  error,
};
