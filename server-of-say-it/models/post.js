const Joi = require('joi');
const mongoose = require('mongoose')

const postShcema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024,
    },
    user_name: {
        type: String,
        ref: 'User'
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', postShcema);

function validatePost(post){

    const schema = Joi.object({
        post: Joi.string().max(1024).required().label('Post')
    });

    return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;