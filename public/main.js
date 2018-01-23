var $posts = $(".posts");

var Posts = function () {
    this.posts = [];
};

Posts.prototype.fetch = function () {

    var currThis = this;
    $.ajax({
        method: "GET",
        url: "/posts",
        success: function (data) {
            console.log(data);
            for (var i = 0, length = data.length; i < length; i++) {
                var fetch = data[i],
                    latLng = new google.maps.LatLng(fetch.location.coordinates[0], fetch.location.coordinates[1]); 
              
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  name: fetch.name,
                  text: fetch.text,
                });
              }
            // currThis.posts = data;
            // console.log("data" + data);
            // console.log("posts from fetch" + currThis.posts);
            currThis._renderPosts();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

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
app.fetch();


//events
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
        app.addPost(currName, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
});