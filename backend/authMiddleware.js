const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        res.status(401).json({
            msg:"unauthorized user!"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    }
    catch(err){
        res.json({
            msg: "invalid token"
        })
    }
}

module.exports = verifyToken