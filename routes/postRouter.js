const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const {createPost} = require('../controllers/postController');

router.post('/create',isLoggedIn,createPost);

module.exports = router;