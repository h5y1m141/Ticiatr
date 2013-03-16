class Ciatr
  constructor:()->

  following:(userName,callback) ->
    query  = "select * from data.html.cssselect where url='http://ciatr.jp/#{userName}/following' and css='div#follow_following'"
    Ti.Yahoo.yql(query,(d) ->
      contents = d.data.results.div.div
      callback(contents)
    )  
  getMovieInfo:(movieID,callback)  =>
    query  = "select * from data.html.cssselect where url='http://ciatr.jp/movie/#{movieID}' and css='div#article_nopadding'"
    Ti.Yahoo.yql(query,(d) ->
      if d.data?
        movieInfo = d.data.results.div.div
        content =
          title        : movieInfo[0].div.h1
          # movieInfo[0].div.img.srcで画像のソースは取得できているが
          # 実際にそのURLにアクセスすると file not found
          # になる
          # cloudinaryを使って画像ファイルを返す仕組みのようなので
          # movieInfo[0].div.img.srcで得られる値を利用しない
          # image        : movieInfo[0].div.img.src
          image        : "http://res.cloudinary.com/viviane/image/upload/w_80,h_112,c_fill/#{movieID}.jpg"
          numberOfStar : movieInfo.length
          description  : movieInfo[0].h2.content
        
        callback(content)
      
    )
  status:(statusID,callback)  ->
    query = "select * from data.html.cssselect where url='http://ciatr.jp/status/#{statusID}' and css='div#timeline_movie_right'"
    Ti.Yahoo.yql(query,(d) ->
      contents = d.data.results.div.div
      callback(contents)
    )

  getPlayingMovieLists:(pageNumber = 1) ->
    # http://ciatr.jp/NewMovies/playing?page="#{pageNumber}"

  showPlayingMovieLists:() ->
    # 本来ならhttp://ciatr.jp/NewMovies/playingにアクセスして得られる
    # ページをparseして、MOVIEのID取得したいが、認可処理の部分の実装
    # 難しいためひとまず静的にMOVIEのID情報を返す
    movieList = [14515,14455,14456,14459,14197,14204,14453,14451,14443,14444,14447,14450]
    return movieList

    

module.exports = Ciatr  