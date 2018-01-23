var wereHere = function () {

  var posts = [];

  var $posts = $(".posts");

  _getData();
  _renderPosts();

  //get api
  function _getData() {
    $.ajax({
      method: "GET",
      url: "posts",
      success: function (data) {
        _saveDB(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };

  //db 

  function _saveDB(data) {
    if (data !== null) {
      posts = data;
    }
    _renderPosts();
  }

  function _renderPosts() {
    $posts.empty();
    var source = $('#post-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < posts.length; i++) {
      var newHTML = template(posts[i]);
      $posts.append(newHTML);
      _renderComments(i)
    }
  }

  function addPost(newPost) {
    var currPost = { text: newPost };
    $.ajax({
      method: "POST",
      data: currPost,
      url: "posts",
      success: function (data) {
        posts.push(data);
        _renderPosts();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  function _renderComments(postIndex) {
    var post = $(".post")[postIndex];
    $commentsList = $(post).find('.comments-list')
    $commentsList.empty();
    var source = $('#comment-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < posts[postIndex].comments.length; i++) {
      var newHTML = template(posts[postIndex].comments[i]);
      $commentsList.append(newHTML);
    }
  }

  var removePost = function (id, index) {
    var url = "posts/" + id;
    $.ajax({
      method: "DELETE",
      url: url,
      success: function (data) {
        posts.splice(index, 1);
        _getData();
        _renderPosts();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };

  var addComment = function (newComment, postIndex) {
    var url = "posts/" + posts[postIndex]._id + "/comments";
    $.ajax({
      method: "POST",
      data: newComment,
      url: url,
      success: function (data) {
        posts[postIndex].comments.push(data);
        _renderComments(postIndex);
        _getData();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };


  var deleteComment = function (postIndex, commentIndex) {
    var url = "posts/" + posts[postIndex]._id + "/comments/" + posts[postIndex].comments[commentIndex]._id;
    $.ajax({
      method: "DELETE",
      url: url,
      success: function (data) {
        posts[postIndex].comments.splice(commentIndex, 1);
        _renderComments(postIndex);
        _getData();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };

  return {
    addPost: addPost,
    removePost: removePost,
    addComment: addComment,
    deleteComment: deleteComment,
  };
};

var app = SpacebookApp();

$('#addpost').on('click', function () {
  event.preventDefault();
  var $input = $("#postText");
  if ($input.val() === "") {
    alert("Please enter text!");
  } else {
    app.addPost($input.val());
    $input.val("");
  }
});

var $posts = $(".posts");

$posts.on('click', '.remove-post', function () {
  event.preventDefault();
  var index = $(this).closest('.post').index();
  var id = $(this).closest('.post').data().id;
  app.removePost(id, index);
});

$posts.on('click', '.toggle-comments', function () {
  event.preventDefault();
  var $clickedPost = $(this).closest('.post');
  $clickedPost.find('.comments-container').toggleClass('show');
});

$posts.on('click', '.add-comment', function () {
  event.preventDefault();
  var $comment = $(this).siblings('.comment');
  var $user = $(this).siblings('.name');

  if ($comment.val() === "" || $user.val() === "") {
    alert("Please enter your name and a comment!");
    return;
  }

  var postIndex = $(this).closest('.post').index();
  var newComment = { text: $comment.val(), user: $user.val() };

  app.addComment(newComment, postIndex);

  $comment.val("");
  $user.val("");

});

$posts.on('click', '.remove-comment', function () {
  event.preventDefault();
  var $commentsList = $(this).closest('.post').find('.comments-list');
  var postIndex = $(this).closest('.post').index();
  var commentIndex = $(this).closest('.comment').index();

  app.deleteComment(postIndex, commentIndex);
});
