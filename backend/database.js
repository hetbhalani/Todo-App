const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connected to db!"))

const mongoSchema = mongoose.Schema({
    title:String,
    description:String,
    isDone:Boolean
})

const todo = mongoose.model('todos',mongoSchema)

module.exports = todo;