const userModel = require('../models/user-model');

 
async function createUser(user){
    const {username,password,email} = user;

    try {
        const newUser = await userModel.create({
            username,
            password,
            email
        })
        return { msg: "user created successfully", data: newUser };
    } catch (err) {
        console.dir(err, { depth: null });
        return ({msg:err});
    }
}

module.exports = createUser;