//

const express = require("express");
var bodyParser = require('body-parser');
const app = express();

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

app.use('/api/posts', (req, res, next) => {
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
  res.status(200).json({
    message: 'successfully recieved ',
    posts: posts
  })
})

app.post('/api/post',(req,res,next)=>{
  const post=req.body;
  console.log(post);
  res.status(201).json({
  message:'post successfully added',
  })
  });

module.exports = app;
