const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const todoRoutes = require('./routes/todo');  
const authRoutes = require('./routes/auth');

dotenv.config()

app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());


app.use('/todo', todoRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(process.env.PORT,()=>{
    console.log("Server starts at " + process.env.PORT);
})