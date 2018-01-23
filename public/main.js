/* es5 class example */

var $posts = $(".posts");

var Post = function () {
    this.posts = [];
    /*     this.managers = [];
        this.cleaners = []; */
}

Post.prototype.addPost = function (name, text) {
    var loc = new Location();
    var currLocation = loc._getLocation();

    var currPost = {name: name, text:text, location: currLocation};

/*     $.ajax({
      method: "POST",
      data: currPost,
      url: "posts",
      success: function (data) {
        this.posts.push(data);
        this._renderPosts();
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
      }
    }); */

    /*to remove when using server
    this.posts.push(currPost);
    this._renderPosts();
    */
}

var Location = function(){
    this.location = {};
}

Location.prototype._getLocation = function(){
    /*calling the api - ajax req*/
    var tempLong = 32;
    var tempLat = 34;
    return {longt:tempLong, lat:tempLat}
}

Post.prototype._renderPosts = function () {
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
    var $nameInput = $("#post-name");
    var $textInput = $("#post-text");

    if ($textInput.val() === "") {
        alert("Please insert text!");
    } 
    else {
        if ($nameInput.val() !==""){
            currName = $nameInput.val();
        }
        app.addPost(currName, $textInput.val());
        $nameInput.val("");
        $textInput.val("");
    }
});