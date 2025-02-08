const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors');
const todoRoutes = require('./routes/todo');
dotenv.config()

app.use(express.json())
app.use(cors());

app.use('/todo', todoRoutes);


app.listen(process.env.PORT,()=>{
    console.log("Server starts at " + process.env.PORT);
})