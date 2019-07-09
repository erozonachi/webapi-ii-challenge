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
  },
  fetchPostById: (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
    .then( data => {
      if( data.length > 0) {
        res.status(200).json(data);
      }
      res.status(404).json({
        message: 'The post with the specified ID does not exist.',
      });
    })
    .catch( err => {
      res.status(500).json({
        error: 'The post information could not be retrieved.',
      })
    });
  },
  fetchComments: (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(id)
    .then( data => {
      if( data.length > 0) {
        res.status(200).json(data);
      }
      res.status(404).json({
        message: 'The post with the specified ID does not exist.',
      });
    })
    .catch( err => {
      res.status(500).json({
        error: 'The comments information could not be retrieved.',
      })
    });
  },
}

module.exports = postsController;
