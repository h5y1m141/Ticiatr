var Ciatr,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Ciatr = (function() {

  function Ciatr() {
    this.getMovieInfo = __bind(this.getMovieInfo, this);

  }

  Ciatr.prototype.following = function(userName, callback) {
    var query;
    query = "select * from data.html.cssselect where url='http://ciatr.jp/" + userName + "/following' and css='div#follow_following'";
    return Ti.Yahoo.yql(query, function(d) {
      var contents;
      contents = d.data.results.div.div;
      return callback(contents);
    });
  };

  Ciatr.prototype.getMovieInfo = function(movieID, callback) {
    var query;
    query = "select * from data.html.cssselect where url='http://ciatr.jp/movie/" + movieID + "' and css='div#article_nopadding'";
    return Ti.Yahoo.yql(query, function(d) {
      var content, movieInfo;
      if (d.data != null) {
        movieInfo = d.data.results.div.div;
        content = {
          title: movieInfo[0].div.h1,
          image: "http://res.cloudinary.com/viviane/image/upload/w_80,h_112,c_fill/" + movieID + ".jpg",
          numberOfStar: movieInfo.length,
          description: movieInfo[0].h2.content
        };
        return callback(content);
      }
    });
  };

  Ciatr.prototype.status = function(statusID, callback) {
    var query;
    query = "select * from data.html.cssselect where url='http://ciatr.jp/status/" + statusID + "' and css='div#timeline_movie_right'";
    return Ti.Yahoo.yql(query, function(d) {
      var contents;
      contents = d.data.results.div.div;
      return callback(contents);
    });
  };

  Ciatr.prototype.getPlayingMovieLists = function(pageNumber) {
    if (pageNumber == null) {
      pageNumber = 1;
    }
  };

  Ciatr.prototype.showPlayingMovieLists = function() {
    var movieList;
    movieList = [14515, 14455, 14456, 14459, 14197, 14204, 14453, 14451, 14443, 14444, 14447, 14450];
    return movieList;
  };

  return Ciatr;

})();

module.exports = Ciatr;
