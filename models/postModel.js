 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 //only for test
//  mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/wereHereDB', {
//   useMongoClient: true
// }, function (err, db) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("DB connection established!");
// });

var locationSchema = new Schema({
  lng: Object,
  lat: Object
});

  var postSchema = new Schema({
    name: String,
    text: String,
    location: locationSchema   
  });
 
var Post = mongoose.model('Post', postSchema);  
 
//tests
/* var david = new Post({ name: "David", text: "David's post", location:{ longt: 32.050556, lat: 34.767082} });
console.log(david);

david.save();

var mika = new Post({ name: "mika", text: "mika's post", location:{ longt: 32.027442, lat: 34.751203} });
console.log(mika);

mika.save();

var lina = new Post({ name: "lina", text: "lina's post", location:{ longt: 31.874228, lat: 34.809439} });
console.log(lina);

lina.save();

Post.find(function (error, result){
  if(error) { return console.error(error); }
  console.log (result);
}); */

module.exports = Post; 
