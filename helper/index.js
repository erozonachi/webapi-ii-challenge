const Validation = {
  validatePost: (req, res, next) => {
    const { title, contents } = req.body;
    if(!title || !contents || title.trim() === '' || contents.trim() === '') {
      res.status(400).json({
        error: 'Please provide title and contents for the post.'
      });
      return;
    }
    next();
  },
  validateComment: (req, res, next) => {
    const { text } = req.body;
    if(!text || text.trim() === '') {
      res.status(400).json({
        error: 'Please provide text for the comment.'
      });
      return;
    }
    next();
  },
}

module.exports = Validation;
