const CommentSchema = require('../models/comment');
const PostSchema = require('../models/post');
const {ObjectId} = require('mongodb')

const addComment = async (req, res) => {
    let data = {
        comment: req.body.comment,
        postId: req.body.postId
    }
    try {
        const comment = await CommentSchema.create(data);
        const post = await PostSchema.findOne({_id: ObjectId(req.body.postId)}).exec();
        if (!post) {
            throw new Error('post not found!')
        }
        post.comments.push(comment._id);
        await post.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getCommentsByPostId = (req, res) => {
    CommentSchema.find({postId: ObjectId(req.params.id)})
        .exec()
        .then((comments) => {
            res.status(200).json(comments);
        }).catch(err => {
            res.status(400).json(error);
        })
}

module.exports = {
    addComment,
    getCommentsByPostId
};