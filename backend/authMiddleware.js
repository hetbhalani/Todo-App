const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()



const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Incoming token:', req);

    if (!token) {
        console.log('No token found');
        return res.status(401).json({
            msg: "unauthorized user!"
        });
    }

    try {
        console.log('Attempting to verify token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        req.user = { _id: decoded.userId };
        console.log('Set user:', req.user);
        
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({
            msg: "invalid token"
        });
    }
};

module.exports = verifyToken