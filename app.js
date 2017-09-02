// $(document).ready(function() {
$('#search').click(function() {
  clearData();
  var input = $('#input').val();

  if (input != '') {
    $.ajax({
      url:
        'https://api.themoviedb.org/3/search/movie?api_key=' +
        '04c43f89291a18f737ac718dfa3a9df2' +
        '&query=' +
        input,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        if (data.results.length === 0) {
          $('.movieList').html('No Results Found');
        } else {
          show(data);
        }
      }
    });
  } else {
    $('#error').html('Field can not be empty');
  }
});
// });
//

function show(data) {
  var title;
  var poster;
  var releaseDate;
  var summary;

  var titles = [];
  var posters = [];
  var releaseDates = [];
  var summaries = [];

  for (var i = 0; i < data.results.length; i++) {
    title = data.results[i].title;
    poster = data.results[i].poster_path;
    releaseDate = data.results[i].release_date;
    summary = data.results[i].overview;

    titles.push(title);
    posters.push(poster);
    releaseDates.push(releaseDate);
    summaries.push(summary);

    $('#results').each(function() {
      $('<div class="list list' + [i] + '"></div>').appendTo('.movieList');
      $('<header><h2></h2></header>').appendTo('.list' + [i]);
      $('<article></article>').appendTo('.list' + [i]);
    });
    $('.list' + [i])
      .children('header')
      .children('h2')
      .append(titles[i] + '(' + releaseDates[i].substr(0, 4) + ')');

    $('.list' + [i]).append(
      '<img class="poster" src=http://image.tmdb.org/t/p/w185/' +
        posters[i] +
        '>'
    );
    $('.list' + [i]).children('article').append(summary);
  }
}

function moreData() {}

function clearData() {
  $('.movieList').empty();
  $('#error').html('');
}
