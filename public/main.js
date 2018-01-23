var $posts = $(".posts");

var Posts = function () {
    this.posts = [];
};

Posts.prototype.addPost = function (name, text, loc) {

var currPost = {name: name, text:text, location: loc};
console.log(currPost);

var currThis = this;
$.ajax({
      method: "POST",
      data: currPost,
      url: "/posts",
      success: function (data) {
        console.log("server: "+ data);
        currThis.posts.push(data); 
        currThis._renderPosts();
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
      }
    });
}

Posts.prototype._renderPosts = function () {
    $posts.empty();
    var source = $('#post-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < this.posts.length; i++) {
        var newHTML = template(this.posts[i]);
        $posts.append(newHTML);
        /* _renderComments(i) */
    }
}

var app = new Posts(); 

$('#addpost').on('click', function () {
    event.preventDefault();
    var currName = "Anonymous";
    var $nameInput = escape(document.getElementById('post-name').value);
    var $textInput = escape(document.getElementById('post-text').value);

    var latlng = marker.getPosition();
    var location = [];

    location.push(latlng.lat());
    location.push(latlng.lng());

    if ($textInput=== "") {
        alert("Please insert text!");
    } 
    else {
        if ($nameInput !== ""){
            currName = $nameInput;
        }
        app.addPost($nameInput, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
});