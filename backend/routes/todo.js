const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = require('../db_todo'); 
const verifyToken = require("../authMiddleware.js")

// const todoSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   isDone: Boolean,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// });

router.post("/", verifyToken,async(req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.user._id;
    try {
        const newTodo = await Todo.create({
            title,
            description,
            isDone:false,
            userId
        });
        
        res.status(200).json({
            msg: "todo created",
        });
    }
    catch (err){
        res.status(500).json({
            msg: "some error: " + err,
        });
    }
});

router.get("/", verifyToken, async(req, res) => {
    const userId = req.user._id;
    console.log(userId);
    try{
        const getTodo = await Todo.find({userId});
        res.status(200).json({
            getTodo,
        })
    }
    catch(err){
        res.status(500).json({
            msg:"some error: " + err
        })
    }
});


router.put('/:id',async(req,res)=>{
    const id = req.params.id
    
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.user._id;

    try {
        const todo = await Todo.findByIdAndUpdate(
            { _id: id, userId },{
                title,
                description
            },{ new: true }
        )
        if (!todo) {
            return res.status(404).json({msg:'Todo not found'});
        }
        res.status(200).json({
            todo
        })
    } catch (error) {
        res.status(500).json({
            msg:"some error: "+ err
        })
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    const userId = req.user._id;

    try{
        const todo = await Todo.findByIdAndDelete({ _id: id, userId })
        if (!todo) {
            return res.status(404).json({message:'Todo not found'});
        }
        res.status(200).json({msg:"Todo deleted"})
    }
    catch(err){
        res.status(500).json({msg:"some error: "+ err})
    }

})

module.exports = router;
