const express = require('express');
const router = express.Router();
const createUser = require('../controllers/create-user');

router.post('/',async (req,res)=>{
    const user = req.body;
    const response = await createUser(user);
    res.json({response});
})

router.get('/',(req,res)=>{
    res.send('working');
})

module.exports = router;