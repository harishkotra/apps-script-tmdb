function getPopularMovies() {
  
  var response = UrlFetchApp.fetch("https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&amp;language=en-US&amp;page=1");
  //Logger.log(response.getContentText());
  var values = [];
  var json = response.getContentText();
  var data = JSON.parse(json);
  var results = data["results"];

  results.forEach(function(item) {
    values.push([item["title"], item["overview"], "https://image.tmdb.org/t/p/w500/" + item["poster_path"], item["vote_average"], item["release_date"]]);
  });
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Popular Movies');
  sheet.getRange(sheet.getLastRow()+1, 1, values.length, values[0].length).setValues(values);
}

function getTopMovies() {
  
  var response = UrlFetchApp.fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=API_KEY&amp;language=en-US&amp;page=1");
  //Logger.log(response.getContentText());
  var values = [];
  var json = response.getContentText();
  var data = JSON.parse(json);
  var results = data["results"];

  results.forEach(function(item) {
    values.push([item["title"], item["overview"], "https://image.tmdb.org/t/p/w500/" + item["poster_path"], item["vote_average"], item["release_date"]]);
  });
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Top Movies');
  sheet.getRange(sheet.getLastRow()+1, 1, values.length, values[0].length).setValues(values);
}

//menu items
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Movies DB Functions')
      .addItem('Get Top Movies','getTopMovies')
      .addItem('Get Popular Movies','getPopularMovies')
      .addToUi();
}
