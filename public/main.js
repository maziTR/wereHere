var $posts = $(".posts");
var Posts = function () {
    this.posts = [];
};

Posts.prototype.deleteMarker = function() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    console.log(markers)
}

Posts.prototype.renderMarkers = function(res, map) {
    
    this.deleteMarker();

    for (var i = 0; i < res.length; i++) {
        var resource = res[i];
   
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(resource.location.coordinates[0].lng, resource.location.coordinates[0].lat),
                name: resource.name,
                text: resource.text,
                map: map,
                clickable: true
            });
            marker.id = resource._id;

            attachPosts(marker, resource);

            markers.push(marker);
            console.log(marker);
    }
};

Posts.prototype.fetch = function () {

    var currThis = this;
    $.ajax({

        method: "GET",
        url: "/posts",
        success: function (data) {

            currThis.posts = data;
            console.log("data" + data);
            console.log("posts from fetch" + currThis.posts);
           
            currThis.renderMarkers(data, map);
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
        
        console.log("data" + data); 
        currThis.posts.push(data);

        currThis.renderMarkers(currThis.posts, map);
        currThis._renderPosts();
        clicked = false;
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
    }
}

Posts.prototype.deletePost = function (index) {
    var postId = this.posts[index]._id;
    var currThis = this;

    $.ajax({
        method: "DELETE",        
        url: "/posts/" + postId,
        success: function (data) {
            currThis.deleteMarker();
            currThis.posts.splice(index, 1);
            currThis.renderMarkers(currThis.posts, map);
            currThis._renderPosts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

var app = new Posts();
app.fetch();

//events

$('#addpost').on('click', function (event) {

    event.preventDefault();
    var currName = "Anonymous";
 
    var $nameInput = $('#post-name');
    var $textInput = $('#post-text');
 
    var latlng = marker.getPosition();
    var location = [];
 
    location.push(latlng.lat());
    location.push(latlng.lng());
 
    if ($textInput.val()=== "") {
        alert("Please insert text!");
    }
    else {
        if ($nameInput.val() !== ""){
            currName = $nameInput.val();
        }
        app.addPost(currName, $textInput.val(), location);
        $nameInput.val('');
        $textInput.val('');
        $('.post-form').removeClass('show'); 
    }
 });

$(".posts").on('click', '.remove-post', function () {
    var index = $(this).closest('.post').index();
    app.deletePost(index);
});

/* $(".close-form").on('click', function () {
    $('.post-form').toggleClass('show');
    clicked = false;
}); */