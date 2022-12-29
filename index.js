const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
require('dotenv').config();

// JSON parser will be used so that when we send the data as JSON it transforms it into a JavaScript Object
app.use(express.json());

app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iykcv1w.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object

  /**
 * get request returns all the data that are currently available
 * Here get requests returns all the posts that are available in the database
 */
app.get("/api/posts", (req, res) => {
    res.json(posts);
  });
  
  /**
   * here we find single post information
   */
  
  app.get("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    post ? res.json(post) : res.status(404).end();
  });

  /**
 * delete method will delete the perspective data
 * Here delete method will delete single post
 */
app.delete("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    remainingPosts = posts.filter((post) => post.id !== id);
  
    res.status(204).end();
  });
  
  app.post("/api/posts", (req, res) => {
    const body = req.body;
    if (!body.user) {
      return res.status(400).json({
        error: "Content missing",
      });
    }
    const newPost = {
      user: body.user,
      post: body.post,
      photoUrl: body.photoUrl,
      like: body.like,
    };
    posts = posts.concat(newPost);
    res.json(newPost);
  });
  client.close();
});



app.get('/',async(req,res)=>{
    res.send('Social Media running')
});

app.listen(port,()=> console.log(`Social Media is running on ${port}`))