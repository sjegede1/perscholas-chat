const express = require("express");
const app = express(); //👌
const mongoose = require("mongoose");
require("dotenv").config();



//=========DB connection===========
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo!! 👍')
})

//=====IMPORT MODELS=====
const Post = require('./models/Post')

//=========MIDDLEWARE===========
app.use(express.json({ extended: false }));

//===========ROUTES=============
app.get("/", (req, res) => {
  res.send("Hello World 🥳"); //🔥
});

//Create route [C]RUD
app.post('/', async (req,res) => {
    try {
        const post = await Post.create(req.body) //req.body does not have _id
        res.send(post) // This will have _id
    } catch (err) {
        console.error(err)
    }
    
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT} http://localhost:${PORT}`);
});
