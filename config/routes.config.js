const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');



router.post('/posts', postsController.create);  
router.get('/posts', postsController.list);                      ;
router.get('/posts/:id', postsController.read);
router.patch('/posts/:id', postsController.update);
router.delete('/posts/:id', postsController.delete);


module.exports = router; 

