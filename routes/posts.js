const express = require('express');
const Posts = require('../controllers/posts');

const app = express.Router();

app.get('/', Posts.fetchPosts);

module.exports = app;
