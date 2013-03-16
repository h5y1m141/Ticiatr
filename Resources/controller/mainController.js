var mainController;

mainController = (function() {

  function mainController() {}

  mainController.prototype.run = function() {
    var movieID, movieList, rows, _i, _len;
    movieList = [14515, 14455, 14456, 14459, 14197, 14204, 14453, 14451, 14443, 14444, 14447, 14450];
    rows = [];
    for (_i = 0, _len = movieList.length; _i < _len; _i++) {
      movieID = movieList[_i];
      ciatr.getMovieInfo(movieID, function(movieInfo) {
        var row;
        row = mainTableView.createRow(movieInfo);
        mainTable.appendRow(row, {
          animated: true
        });
        return true;
      });
    }
    return true;
  };

  return mainController;

})();

module.exports = mainController;
