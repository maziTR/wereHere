var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./models/postModel');

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/wereHereDB', {
  useMongoClient: true
}, function (err, db) {
  if (err) {
    return console.error(err);
  }
  console.log("DB connection established!");
});

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//route to get all posts to show in view
app.get("/posts", function (req, res) {

  Post.find({}).exec(function (err, post) {
    if (err) {
      res.status(500).send(err);
      return console.error(err);
    } else {
      // send the list of all people
      res.status(200).send(post);
    }
  });
});

//route to add a post
app.post('/posts', function (req, res) {
  console.log(req.body.location);
  var postObj = new Post({
    name: req.body.name,
    text: req.body.text,
    location: {
      type: "Point",
      coordinates: {
        lng: req.body.location[0],
        lat: req.body.location[1]
      }
    }
  });

  postObj.save(function (err, post) {
    if (err) {
      return console.error(err);
    }
    res.send(post);
  });
});

//to handle deleting a post
 app.delete('/posts/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) {
      res.send(err);
      return console.error(err);
    }
    res.send(post);
  });
}); 

app.put('/posts/:idPost', function (req, res) {
  var idPost = req.params.idPost;
  var text = req.body;

  Post.findById(idPost, function (err, post) {
    post.text = text.value;
    post.save();
    res.send(post);
  }
  )
});


app.listen(process.env.PORT || '8080', function () {
  console.log("server alive");
});