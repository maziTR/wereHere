var $posts = $(".posts");
var posts = [];
var Post = function () {};

Post.prototype.addPost = function (name, text,loc) {
    var doc = { name: name, text: text, loc: { type: "Point", coordinates: loc }};
    
    $.ajax({
      method: "POST",
      data: doc,
      url: "posts",
      dataType: "json",
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

var app = new Post(); 

$('#addpost').on('click', function () {
    event.preventDefault();
    var currName = "Anonymous";
    var $nameInput = escape(document.getElementById('post-name').value);
    var $textInput = escape(document.getElementById('post-text').value);

    var latlng = marker.getPosition();
    var location = [lat = latlng.lat(), lng = latlng.lng() ]
    console.log(location);
    if ($textInput=== "") {
        alert("Please insert text!");
    } 
    else {
        if ($nameInput !== ""){
            $nameInput = currName;
        }
        app.addPost(nameInput, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
});