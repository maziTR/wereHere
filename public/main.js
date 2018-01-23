// /* 
// es5 class example

// var Office = function () {
//     this.documents = [];
//     this.managers = [];
//     this.cleaners = [];
// }

// Office.prototype.hireCleaner = function (name) {
//     var currCleaner = new Cleaner();
//     currCleaner.name = name;
//     this.cleaners.push(currCleaner);
// }

// */

// var wereHere = function () {

//     var posts = [];

//     var $posts = $(".posts");

//     // _getData();
//     // _renderPosts();

//     //get api
//     function _getData() {
//         $.ajax({
//             method: "GET",
//             url: "posts",
//             success: function (data) {
//                 _saveDB(data);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 console.log(textStatus);
//             }
//         });
//     };

//     //db 

//     function _saveDB(data) {
//         if (data !== null) {
//             posts = data;
//         }
//         _renderPosts();
//     }

//     function _renderPosts() {
//         $posts.empty();
//         var source = $('#post-template').html();
//         var template = Handlebars.compile(source);
//         for (var i = 0; i < posts.length; i++) {
//             var newHTML = template(posts[i]);
//             $posts.append(newHTML);
//             _renderComments(i)
//         }
//     }

//     /*     function addPost(newPost) {
//             var currPost = { text: newPost };
//             $.ajax({
//                 method: "POST",
//                 data: currPost,
//                 url: "posts",
//                 success: function (data) {
//                     posts.push(data);
//                     _renderPosts();
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                     console.log(textStatus);
//                 }
//             });
//         } */

//     var removePost = function (id, index) {
//         /*         var url = "posts/" + id;
//                 $.ajax({
//                     method: "DELETE",
//                     url: url,
//                     success: function (data) {
//                         posts.splice(index, 1);
//                         _getData();
//                         _renderPosts();
//                     },
//                     error: function (jqXHR, textStatus, errorThrown) {
//                         console.log(textStatus);
//                     }
//                 });
//             }; */

//         return {
//             addPost: addPost,
//             removePost: removePost,
//         }
//     }
// };

// var app = wereHere();

