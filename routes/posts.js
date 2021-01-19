const express = require('express');
const postController = require('../controllers/PostController');
const router = express.Router();

router.post('/', postController.addPost);
router.get('/', postController.getAllPosts);

module.exports = router;
