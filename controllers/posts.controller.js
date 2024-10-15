const Post = require('../models/post.models');
const tokens = require('../config/tokens.config');


 module.exports.create = async (req, res) => {
 req.body.user = req.user.id;
 Post.create(req.body)

 .then((post) => {
     res.status(201).json(post);
 })
 .catch((error) => {
     res.status(400).json(error);
 });
};  

module.exports.list = async (req, res) => {
    Post.find()
    .populate('user')
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
};  

module.exports.read = async (req, res) => {
    Post.findById(req.params.id)
    .then((post) => {
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).json(post);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
}

module.exports.update = async (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true,
    })
    .then((post) => {
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).json(post);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
};

module.exports.delete = async (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then((post) => {
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(204).json();
    })
    .catch((error) => {
        res.status(500).json(error);
    });
};

