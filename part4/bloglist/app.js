const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');

const {errorHandler, tokenExtractor} = require('./utils/middleware');
const app = express();
const config = require('./config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);
module.exports = app;
