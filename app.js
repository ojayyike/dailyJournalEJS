//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3008;
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var _ = require("lodash")
var posts = [];
var postId = 0;
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.listen(port, (req, res) => {
  console.log("App is listening on Port: " + port);
});

app.get("/", (req, res) => {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    journalPosts: posts,
    postId: postId,
  });
});
app.get("/about", (req, res) => {
  res.render("about", { aboutStartingContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactStartingContent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post/:postId", (req, res) => {
  var post = posts[req.params.postId];
  res.render("post", { journalPost: post });
});
app.get("/title/:Title", (req, res) => {
  var postTitle = req.params.Title
  postTitle = _.lowerCase(postTitle)
  console.log(postTitle)
  posts.forEach((post) => {
    if (post.title === postTitle) {
      res.render("post", { journalPost: post });
    } else {
      console.log("Page not found")
    }
  })
});

app.post("/compose", (req, res) => {
  var titleText = req.body.composeTitleText;
  var postText = req.body.composePostTextArea;

  var composeBody = {
    id: postId,
    title: titleText,
    postText: postText,
  };
  postId++;
  posts.push(composeBody);
  res.redirect("/");
});
