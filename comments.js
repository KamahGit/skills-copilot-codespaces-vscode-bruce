// Create web server with Node.js and Express framework
// Create API to get, post, put, delete data from MongoDB

// Require modules
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Get all comments
router.get("/", (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get a comment by id
router.get("/:id", (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add a comment
router.post("/add", (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  });

  newComment
    .save()
    .then(() => res.json("Comment added successfully!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update a comment by id
router.put("/:id", (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      comment.name = req.body.name;
      comment.email = req.body.email;
      comment.comment = req.body.comment;

      comment
        .save()
        .then(() => res.json("Comment updated successfully!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete a comment by id
router.delete("/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment deleted successfully!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;