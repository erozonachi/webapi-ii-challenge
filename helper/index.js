const Validation = {
  validatePost: (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents || title.trim() === '' || contents.trim() === '') {
      res.status(400).json({
        error: 'Please provide title and contents for the post.'
      })
    }
  },
}

module.exports = Validation;
