var queryURL =
  "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=UPZblAhNpAtzIbS8hpCkK9jJtTtXswoG";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
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
