const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const {createPost,readPost,likeHandler,commentHandler} = require('../controllers/postController');

router.get('/:id',readPost);
router.post('/create',isLoggedIn,createPost);
router.post('/like/:id',isLoggedIn,likeHandler);
router.post('/comment/:id',isLoggedIn,commentHandler);
module.exports = router;