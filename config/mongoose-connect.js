const mongoose = require('mongoose');

const makeconnetction = async ()=> mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB Connected...');
})
.catch((err)=>{
    console.log(err);
});

module.exports = makeconnetction;