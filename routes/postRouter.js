const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const {
    createPost,
    readPost,
    likeHandler,
    commentHandler,
    getExplore,
    getPersonalFeed
} = require('../controllers/postController');

router.get('/explore',getExplore);
router.get('/personalFeed',isLoggedIn,getPersonalFeed);
router.post('/create',isLoggedIn,createPost);
router.post('/like/:id',isLoggedIn,likeHandler);
router.post('/comment/:id',isLoggedIn,commentHandler);
router.get('/:id',readPost); // dynamic routes ko last me add krna hai 

module.exports = router;