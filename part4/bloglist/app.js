const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./controllers/blog');

const app = express();
const config = require('./config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', router);

module.exports = app;
