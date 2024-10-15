const Post = require('../models/post.models');
const tokens = require('../config/tokens.config');


/* module.exports.create = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.list = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

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

/* module.exports.list = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const userId = tokens.loadSession(token);

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    Post.find({ user: userId })
    
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(500).json(error);
    }
    );
}; */
 
/* module.exports.list = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
};*/

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






/* 
 module.exports.create = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log del cuerpo de la solicitud
        const { title, text, author } = req.body;
        if (!title || !text || !author) {
            return res.status(400).send({ error: 'All fields are required' });
        }
        const newPost = new Post({ title, text, author });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        console.error('Error creating post:', error); // Log del error
        res.status(400).send({ error: error.message });
    }
};   */