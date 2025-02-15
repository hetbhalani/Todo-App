const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connected to db!"))

const mongoSchema = mongoose.Schema({
    title:String,
    description:String,
    isDone:{ type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Todo = mongoose.model('Todo',mongoSchema)

module.exports = Todo;