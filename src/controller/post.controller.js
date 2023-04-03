const Post = require('../models/post.model.js');

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Post
  const post = new Post({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  // Save Post in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Post.',
      });
    else res.send(data);
  });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts.',
      });
    else res.send(data);
  });
};
