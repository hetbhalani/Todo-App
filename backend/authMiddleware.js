const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()



const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "No authentication token found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded= "+ decoded);

        req.user = { _id: decoded.userId };
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
};
module.exports = verifyToken