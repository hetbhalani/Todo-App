const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = require("../database.js");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  idDone: Boolean,
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

    try {
        const newTodo = Todo.create({
            title,
            description,
            isDone:false
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

router.get("/", async(req, res) => {
    try{
        const getTodo = await Todo.find({});
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

    try {
        const todo = await Todo.findByIdAndUpdate(
            id,{
                title,
                description
            }
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

    try{
        const todo = await Todo.findByIdAndDelete(id)
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
