const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./controllers/blog');
const {errorHandler} = require('./utils/middleware');
const app = express();
const config = require('./config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', router);
app.use(errorHandler);
module.exports = app;
