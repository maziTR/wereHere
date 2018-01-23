/* var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    user: String
  });
  
  var postSchema = new mongoose.Schema({
    text: String,
    comments: [commentSchema]
  });

var Post = mongoose.model('Post', postSchema); */

//tests

/* var posti = new Post({ text: 'I am a lovely post', user: 'Sholman', comments: [] });
posti.comments.push({ user: "Sherman", text: "Lovely Post indeed!" });

posti.save(function(err, data) {
    if (err) { return console.error(err); }
    console.log(data);
});   */

/* must have!!
var Post = mongoose.model('post', postSchema)

module.exports = Post; */
