const express = require("express")
const jwt = require("jsonwebtoken")
const User = require ('../db_user')

const router = express.Router();

router.post('/signup', async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password

    try {
        const existingUsers = await User.findOne({email})

        if(existingUsers){
            return res.json({
                msg:"user already exists"
            })
        }

        const newUser = new User({email,password})
        await newUser.save()

        res.json({msg: "user created successfully"});

    } catch (error) {
        res.status(500).json({msg: "error in server"});
    }
})

router.post('/login', async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        if (password != user.password) return res.status(400).json({ message: "Invalid credentials" });


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.cookie("token",token,{
            httpOnly : true,
            secure: true,
        })

        res.json({
            msg:"Login Successful"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
})

module.exports = router;