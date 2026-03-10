const jwt = require('jsonwebtoken');

const isLoggedIn = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({msg:'You must be logged in'});

    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({msg:'Invalid or expired token'});
    }
}

module.exports = isLoggedIn;