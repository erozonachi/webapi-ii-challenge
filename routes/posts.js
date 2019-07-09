const express = require('express');
const Validator = require('../helper');
const Posts = require('../controllers/posts');

const app = express.Router();

app.get('/', Posts.fetchPosts);
app.get('/:id', Posts.fetchPostById);
app.get('/:id/comments', Posts.fetchComments);
app.post('/', Validator.validatePost, Posts.createPost);
app.post('/:id/comments', Validator.validateComment, Posts.addComment);

module.exports = app;
