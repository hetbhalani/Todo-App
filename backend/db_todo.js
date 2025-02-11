const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connected to db!"))

const mongoSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    title:String,
    description:String,
    isDone:{ type: Boolean, default: false },
})

const Todo = mongoose.model('Todo',mongoSchema)

module.exports = Todo;