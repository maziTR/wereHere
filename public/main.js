var $posts = $(".posts");
var posts = [];
var Post = function () {};

Post.prototype.addPost = function (name, text,loc) {
/*     var currLocation = JSON.parse(loc); */
    var currPost = {name: name, text:text, location: loc};

    $.ajax({
      method: "POST",
      data: currPost,
      url: "posts",
      scriptCharset: "jsonp",
      success: function (data) {
        console.log(data);
        posts.push(data); 
        _renderPosts();
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
      }
    });
}

_renderPosts = function () {
    $posts.empty();
    var source = $('#post-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < this.posts.length; i++) {
        var newHTML = template(this.posts[i]);
        $posts.append(newHTML);
        /* _renderComments(i) */
    }
}

<<<<<<< HEAD
var app = new Post();
/* 
=======
var app = new Post(); 

>>>>>>> e6fa33378eda2384138dcd7915ef06dace8f27cb
$('#addpost').on('click', function () {
    event.preventDefault();
    var currName = "Anonymous";
    var $nameInput = escape(document.getElementById('post-name').value);
    var $textInput = escape(document.getElementById('post-text').value);

    var latlng = marker.getPosition();
    var location = {lng: latlng.lng(), lat: latlng.lat() }
    console.log(location);
    if ($textInput=== "") {
        alert("Please insert text!");
    } 
    else {
        if ($nameInput !==""){
            currName = $nameInput;
        }
        app.addPost(currName, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
}); */