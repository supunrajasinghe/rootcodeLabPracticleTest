const express = require('express');
const commentController = require('../controllers/CommentController');
const router = express.Router();

router.post('/', commentController.addComment);
router.get('/:id', commentController.getCommentsByPostId);

module.exports = router;
