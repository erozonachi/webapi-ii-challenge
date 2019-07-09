const Posts = require('../data/db');

const postsController = {
  fetchPosts: (req, res) => {
    Posts.find()
    .then( data => {
      res.status(200).json(data);
    })
    .catch( err => {
      res.status(500).json({
        error: 'The posts information could not be retrieved.',
      })
    });
  }
}

module.exports = postsController;
