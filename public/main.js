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

            currThis.posts = data;
            console.log("data" + data);
            console.log("posts from fetch" + currThis.posts);
            currThis._renderPosts();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

Posts.prototype.addPost = function (name, text, loc) {

    var doc = { name: name, text: text, loc: { type: "Point", coordinates: loc } };
  
    var currThis = this;
    $.ajax({
        method: "POST",
        data: doc,
        url: "/posts",
        dataType: "json",
        success: function (data) {
            console.log(data);
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


$('#addpost').on('click', function () {
    event.preventDefault();
    var currName = "Anonymous";
    var $nameInput = escape(document.getElementById('post-name').value);
    var $textInput = escape(document.getElementById('post-text').value);

    var latlng = marker.getPosition();
    var location = [lat = latlng.lat(), lng = latlng.lng()]
    console.log(location);
    if ($textInput === "") {
        alert("Please insert text!");
    }
    else {
        if ($nameInput !== "") {
            $nameInput = currName;
        }
        app.addPost($nameInput, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
});


// $(".posts").on('click', '.remove-post', function () {
//     var index = $(this).closest('.post').index();
//     console.log(index);
//     app.deletePost(index);
// });


$('.remove-post').on('click', function () {
    var index = $(this).closest('.post').index();
    console.log(index);
    app.deletePost(index);
});
