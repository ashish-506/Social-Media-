const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { sendRequest, acceptedRequest, rejectRequest,withdrawRequest, removeFollower, unfollow, myFollowers, myfollowing } = require('../controllers/connectionController');

router.use(isLoggedIn);
router.post('/send/:id',sendRequest);
router.post('/accept/:id',acceptedRequest);
router.post('/reject/:id',rejectRequest);
router.post('/withdraw/:id',withdrawRequest);
router.post('/remove/:id',removeFollower);
router.post('/unfollow/:id',unfollow);
router.get('/myfollower',myFollowers);
router.get('/myfollowing',myfollowing);

module.exports = router;