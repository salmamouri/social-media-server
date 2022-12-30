const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const uri = `mongodb+srv://smedia:${password}@cluster0.iykcv1w.mongodb.net/?retryWrites=true&w=majority`

const postSchema = new mongoose.Schema({
  user: String,
  post: String,
  photoUrl: String,
  likes: Number,
});

const Post = mongoose.model("Post ", postSchema);

mongoose.connect(uri).then((result) => {
  console.log("Connected");

  const post = new Post({
    user: "String",
    post: "String",
    photoUrl: "String",
    likes: 100,
  });
  return post.save()
}).then(()=> {
    console.log("Post saved");
    return mongoose.connection.close()
}).catch(err => console.log(err))
