const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { validatePost, Post } = require('../models/post');

router.get('/all', auth , async (req, res) =>{

    const posts = await Post.find().sort({_id:-1});
    if(!posts) return res.status(404).send('No posts.');

    res.send(posts);

})

router.get('/my', auth , async (req, res) =>{

    const posts = await Post.find({user_id: req.user._id}).sort({_id:-1});;
    if(!posts) return res.status(404).send('No posts.');

    res.send(posts);

})

router.delete('/:id', auth, async (req, res) =>{

    const post = await Post.findOneAndDelete({_id: req.params.id, user_id: req.user._id});
    if (!post) return res.status(404).send('The post with the given id was no found.');

    res.send(post);

})

router.put('/:id', auth, async (req, res) =>{

    const { error } = validatePost(req.body);
    if(error) return res.status(400).send(error.details);

    const post = await Post.findOneAndUpdate({_id: req.params.id, user_id: req.user._id}, {text: req.body.post});
    if (!post) return res.status(404).send('The post with the given id was no found.');

    res.send(post);

})

router.get('/:id', auth, async (req, res) =>{

    const post =  await Post.findOne({_id: req.params.id, user_id: req.user._id});
    if(!post) return res.status(404).send('The post with the given id was no found.');

    res.send(post);

});

router.post('/create', auth, async (req, res) =>{
    
    const { error } = validatePost(req.body);
    if( error ) return res.status(400).send(error.details);

    let post = new Post({
        text: req.body.post,
        user_name: req.user.name,
        user_id: req.user._id
    });

    let savePost = await post.save();

    res.send(savePost);

});

module.exports = router;