const PostSchema = require('../models/post');

const addPost = async (req, res) => {
    let data = {
        title: req.body.title,
        description: req.body.description
    }
    try {
        const post = await PostSchema.create(data)
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostSchema.find().populate("comments");
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    addPost,
    getAllPosts
};