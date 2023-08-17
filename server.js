const express = require("express");
const app = express(); //👌
const mongoose = require("mongoose");
require("dotenv").config();

//=========DB connection===========
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo!! 👍");
});

//=====IMPORT MODELS=====
const Post = require("./models/Post");

//=========MIDDLEWARE===========
app.use(express.json({ extended: false }));

//===========ROUTES=============
//INDEX ROUTE C[R]UD
app.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.send(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: Read route");
  }
});

//CREATE ROUTE [C]RUD
app.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body); //req.body does not have _id
    res.send(post); // This will have _id
  } catch (err) {
    console.error(err);
    res.status("Server Error: Create Route");
  }
});

//DELETE ROUTE CRU[D]
app.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.send("Deleted Post");
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error: DELETE Route')
  }
});

//UPDATE ROUTE CR[U]D
app.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // {new: true} helps us output the new data as opposed to old data
    res.send(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: Update Route");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT} http://localhost:${PORT}`);
});
