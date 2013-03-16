class mainController
  constructor:()->
     
  run:() ->
    movieList = [14515,14455,14456,14459,14197,14204,14453,14451,14443,14444,14447,14450]
    rows = []
    for movieID in movieList

      ciatr.getMovieInfo(movieID,(movieInfo) ->
        row = mainTableView.createRow(movieInfo)
        mainTable.appendRow(row,{animated:true})
        return true

      )
      
    return true
        

module.exports = mainController