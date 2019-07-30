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
        return;
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
  createPost: (req, res) => {
    Posts.insert(req.body)
    .then( data => {
      return Posts.findById(data.id);
    })
    .then( data => {
      res.status(201).json(data[0]);
    })
    .catch( err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      })
    });
  },
  updatePost: (req, res) => {
    const { id } = req.params;
    Posts.update(id, req.body)
    .then( data => {
      if(data === 0) {
        res.status(404).json({
          error: 'The post with the specified ID does not exist.'
        });
        return;
      }
      return Posts.findById(id);
    })
    .then( data => {
      if(data && Array.isArray(data) && data.length > 0) {
        res.status(200).json(data[0]);
      }
    })
    .catch( err => {
      res.status(500).json({
        error: 'The post information could not be modified.',
      })
    });
  },
  addComment: (req, res) => {
    const { id } = req.params;
    Posts.insertComment({...req.body, post_id: parseInt(id, 10)})
    .then( data => {
      return Posts.findCommentById(data.id);
    })
    .then( data => {
      res.status(201).json(data[0]);
    })
    .catch( err => {
      if(err.errno === 19) {
        res.status(404).json({
          error: 'The post with the specified ID does not exist.',
        });
        return;
      }
      res.status(500).json({
        error: 'There was an error while saving the comment to the database',
      })
    });
  },
  removePost: (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
    .then( data => {
      if(data === 0) {
        res.status(404).json({
          error: 'The post with the specified ID does not exist.'
        });
        return;
      }
      res.status(200).json({
        message: 'Post removed successfully'
      });
    })
    .catch( err => {
      res.status(500).json({
        error: 'The post could not be removed',
      })
    });
  },
}

module.exports = postsController;
