const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const todoRoutes = require('./routes/todo');  
const authRoutes = require('./routes/auth');

dotenv.config()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());


app.use('/todo', todoRoutes);
app.use('/auth', authRoutes);
app.use((req, res, next) => {
  console.log("Cookies received:", req.cookies);
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(process.env.PORT,()=>{
    console.log("Server starts at " + process.env.PORT);
})