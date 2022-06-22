const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const app = express();
const Post = require('./models/post');

const username = encodeURIComponent("rahafzaiter");
const password = encodeURIComponent("1234");
const cluster = "cluster0";

console.log('username and password',username,password)
mongoose.connect(
    `mongodb+srv://${username}:${password}${cluster}.uwltqam.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

// const uri=`mongodb+srv://${username}@${password}${cluster}.uwltqam.mongodb.net/?retryWrites=true&w=majority`
// const uri = "mongodb+srv://rahafzaiter:1234@cluster0.uwltqam.mongodb.net/?retryWrites=true&w=majority"
// async function run() {
//   try {
//     await mongoose.connect(uri);
//   }
//   catch{
//      console.log('Failed')
//   }
// }

// run().catch(console.log('Connection Failed'));

// var cors = require('cors')

// app.use(cors());

app.use(bodyParser.json());

//and we can use :
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: 'first post',
      content: 'this is a content A'
    },
    {
      id: 2,
      title: 'second post',
      content: 'this is a content B'
    },
    {
      id: 3,
      title: 'third post',
      content: 'this is a content C'
    },
  ]
  // console.log('posts',posts)
  res.status(200).json({
    message: 'successfully recieved ',
    posts: posts
  })
})

app.post('/api/post', (req, res, next) => {
  // const post=req.body;

  const post_added = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log('post for posts', post_added);
  post_added.save();
  res.status(201).json({
    message: 'post successfully added'
  })
});

module.exports = app;
// Mv05D5905DVzdmrv
