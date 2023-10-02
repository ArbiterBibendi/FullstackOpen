const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connection.close();
  process.exit(0);
};
