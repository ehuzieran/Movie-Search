$('#search').click(function() {
  clearData();
  var input = $('#input').val();

  if (input != '') {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        'https://api.themoviedb.org/3/search/movie?api_key=' +
        '04c43f89291a18f737ac718dfa3a9df2' +
        '&query=' +
        input,
      method: 'GET',
      headers: {},
      data: '{}'
    };

    $.ajax(settings).done(function(data) {
      if (data.results.length === 0) {
        $('.movieList').html('No Results Found');
      } else {
        show(data);
      }
    });
  } else {
    $('#error').html('Field can not be empty');
  }
});


function show(data) {
  var titles = [];
  var posters = [];
  var releaseDates = [];
  var summaries = [];

  for (var i = 0; i < data.results.length; i++) {
    var title = data.results[i].title;
    var poster = data.results[i].poster_path;
    var releaseDate = data.results[i].release_date;
    var summary = data.results[i].overview;
    
    titles.push(title);
    posters.push(poster);
    releaseDates.push(releaseDate);
    summaries.push(summary);

    $('.movieList').each(function() {
      $('<div class="list list' + [i] + '"></div>').appendTo('.movieList');
      $('<div class="details details' + [i] + '"</div>').appendTo(
        '.list' + [i]
      );
      $('<h2></h2>').appendTo('.details' + [i]);
    });
    //TITLE AND DATE
    if (titles[i] === '') {
      $('.list' + [i])
        .children('.details')
        .children('h2')
        .append(
          'Title Undefined' +
            '<span class="date"> (' +
            releaseDates[i].substr(0, 4) +
            ')</span>'
        );
    } else if (releaseDates[i] === '') {
      $('.list' + [i])
        .children('.details')
        .children('h2')
        .append(
          'Title Undefined' + '<span class="date"> (Date Undefined)</span>'
        );
    } else {
      $('.list' + [i])
        .children('.details')
        .children('h2')
        .append(
          titles[i] +
            '<span class="date"> (' +
            releaseDates[i].substr(0, 4) +
            ')</span>'
        );
    }

    //POSTER
    if (posters[i] === null) {
      $('.list' + [i]).append('<img class="noImage" src="https://c05.imgup.net/x60ba.png">');
    } else {
      $('.list' + [i]).append(
        '<img class="poster" src=https://image.tmdb.org/t/p/w185/' +
          posters[i] +
          '>'
      );
    }
    //SUMMARY
    if (summary === '') {
      $('.list' + [i])
        .children('.details')
        .append('<em>No Summary Available</em>');
    } else {
      $('.list' + [i]).children('.details').append(summary);
    }
  }
}

function clearData() {
  $('.movieList').empty();
  $('#error').html('');
}
