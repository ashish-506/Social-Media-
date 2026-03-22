const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { 
    sendRequest,
    acceptedRequest, 
    rejectRequest, 
    withdrawRequest, 
    removeFollower, 
    unfollow, 
    myFollowers,
    myfollowing 
} = require('../controllers/connectionController');

router.use(isLoggedIn);
router.get('/myfollower',myFollowers);
router.get('/myfollowing',myfollowing); // dynamic routes static routes ke neeche rakhna hai
router.post('/send/:id',sendRequest);
router.post('/accept/:id',acceptedRequest);
router.post('/reject/:id',rejectRequest);
router.post('/withdraw/:id',withdrawRequest);
router.delete('/remove/:id',removeFollower);
router.delete('/unfollow/:id',unfollow);

module.exports = router;