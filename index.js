const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("url, ", url);


app.use(express.static("build"));

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

// JSON parser will be used so that when we send the data as JSON it transforms it into a JavaScript Object
app.use(express.json());


// app.use(requestLogger);

app.use(cors());

let posts = [
  {
    id: 0,
    user: "Mouri",
    post: "lorem ipsum dolor sit amet",
    photoUrl: "NA",
    like: 2,
  },
  {
    id: 1,
    user: "Sama",
    post: "lorem ipsum dolor sit amet",
    photoUrl: "NA",
    like: 11,
  },
  {
    id: 2,
    user: "Tabassum",
    post: "BKGC was established on 1923 and I am so excited to join the gtg",
    photoUrl: "NA",
    like: 2,
  },
];
mongoose.set("strictQuery", false);
mongoose.connect(url);
const postSchema = new mongoose.Schema({
  user: String,
  post: String,
  photoUrl: String,
  likes: Number,
});

const Post = mongoose.model("Post", postSchema);

/**
 * get request returns all the data that are currently available
 * Here get requests returns all the posts that are available in the database
 */
app.get("/api/posts", (req, res) => {
  Post.find({}).then((posts) => {
    res.json(posts);
  });
});

/**
 * here we find single post information
 */

app.get("/api/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

/**
 * delete method will delete the perspective data
 * Here delete method will delete single post
 */
app.delete("/api/posts/:id", (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/posts", (req, res) => {
  const body = req.body;
  if (!body.user) {
    return res.status(400).json({
      error: "Content missing",
    });
  }
  const newPost = new Post({
    user: body.user,
    post: body.post,
    photoUrl: body.photoUrl,
    likes: body.likes,
  });
  newPost.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const body = req.body

  const post = {
    user: body.user,
    post: body.post,
    photoUrl: body.photoUrl,
    likes: body.likes,
  }

  Post.findByIdAndUpdate(req.params.id, post, {new: true} ).then(updatedPost => {
    res.json(updatedPost)
  }).catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
