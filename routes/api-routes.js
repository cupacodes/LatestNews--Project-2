// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts
  app.get("/api/article/", function (req, res) {
    db.Article.findAll({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  // Get route for returning article of a specific category
  app.get("/api/article/category/:category", function (req, res) {
    db.Article.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/article/:id", function (req, res) {
    db.Article.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  // POST route for saving a new post
  app.post("/api/article", function (req, res) {
    console.log(req.body);
    db.Article.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  // DELETE route for deleting article
  app.delete("/api/article/:id", function (req, res) {
    db.Article.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  // PUT route for updating article
  app.put("/api/article", function (req, res) {
    db.Article.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  });

  var queryURL =
    "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=UPZblAhNpAtzIbS8hpCkK9jJtTtXswoG";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.results);
    var results = response.results;
    console.log(response.results[0].url);
    for (var i = 0; i < 5; i++) {
      console.log(results[i].url);
      console.log(results[i].title);
      console.log(results[i].published_date);

      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
      $("#article-section").append($articleList);
      var title = results[i].title;
      var $articleListItem = $("<li class='list-group-item articleHeadline'>");
      $articleListItem.append(title);
      $articleList.append($articleListItem);
      var url = results[i].url;
      var publishedDate = results[i].published_date;
      $articleListItem.append(url);
      $articleListItem.append(publishedDate);
    }
  });
};