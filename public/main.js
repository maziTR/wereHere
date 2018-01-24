var $posts = $(".posts");

var Posts = function () {
    this.posts = {};
};

<<<<<<< HEAD
function getMarkers(res) {
=======
Posts.prototype.renderMarkers = function(res) {
>>>>>>> 9c72012d434becfc3a855b714fe930ff446a7192
    for (var i = 0, len = res.length; i < len; i++) {
        var fetch = res[i];

        if (app.hasOwnProperty(fetch._id)) {
            app[fetch._id].setPosition(new google.maps.LatLng(fetch.location.coordinates[0].lng, fetch.location.coordinates[0].lat));
        } else {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(fetch.location.coordinates[0].lng, fetch.location.coordinates[0].lat),
                name: fetch.name,
                text: fetch.text,
                map: map,
                clickable: true
            });
            app[fetch._id] = marker;
        }
        attachPosts(marker, res[i]);
    }
};

Posts.prototype.fetch = function () {

Posts.prototype.fetch = function () {
    currThis = this;
    $.ajax({

        method: "GET",
        url: "/posts",
        success: function (data) {

            currThis.posts = data;
            console.log("data" + data);
            console.log("posts from fetch" + currThis.posts);
           
            currThis.renderMarkers(data);
            currThis._renderPosts();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

Posts.prototype.addPost = function (name, text, loc) {

    var currPost = { name: name, text: text, location: loc };
    console.log(currPost);

    var currThis = this;
    $.ajax({
        method: "POST",
        data: currPost,
        url: "/posts",
        success: function (data) {
            console.log("server: " + data);
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

Posts.prototype.deletePost = function (index) {

    var postId = this.posts[index]._id;
    console.log(postId);
    var currThis = this;

    $.ajax({

        method: "DELETE",        
        url: "/posts/" + postId,
        success: function (data) {
            console.log(data);
            currThis.posts.splice(index, 1);
            currThis.fetch();
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

$('#map').on('click','#addpost', function (event) {
    
    event.preventDefault();
    var currName = "Anonymous";
    // escape(document.getElementById('post-name').value);
    // escape(document.getElementById('post-text').value);
 
    var $nameInput = $(this).closest('#post-form').find('#post-name');
    var $textInput = $(this).closest('#post-form').find('#post-text');
    console.log(marker);

    var location = [];

    if (marker == undefined){
        location.push([32.063567, 34.773053 ]);
    }
    else{
        var latlng = marker.getPosition();
        location.push(latlng.lat());
        location.push(latlng.lng());
    }

 

 
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
    }
 });

$(".posts").on('click', '.remove-post', function () {
    var index = $(this).closest('.post').index();
    console.log(index);
    app.deletePost(index);
});

