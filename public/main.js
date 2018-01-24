var $posts = $(".posts");

var Posts = function () {
    this.posts = {};
};

function getMarkers(res) {
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

    $.ajax({
        method: "GET",
        url: "/posts",
        dataType: 'json',
        success: function (res) {
            getMarkers(res);
            app = res;
            app._renderPosts();
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

var app = new Posts();
app.fetch();


//events
$('#map').on('click','#addpost', function (event) {
    event.preventDefault();
    var currName = "Anonymous";
    var $nameInput = escape(document.getElementById('post-name').value);
    var $textInput = escape(document.getElementById('post-text').value);

    var latlng = this.marker.getPosition();
    var location = [];

    location.push(latlng.lat());
    location.push(latlng.lng());

    if ($textInput === "") {
        alert("Please insert text!");
    }
    else {
        if ($nameInput !== "") {
            currName = $nameInput;
        }
        app.addPost(currName, $textInput, location);
        $nameInput = "";
        $textInput = "";
    }
})