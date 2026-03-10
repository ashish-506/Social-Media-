const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const {createPost,readPost} = require('../controllers/postController');

router.get('/:id',readPost);
router.post('/create',isLoggedIn,createPost);
module.exports = router;