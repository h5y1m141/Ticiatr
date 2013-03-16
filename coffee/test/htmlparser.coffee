describe 'httpClient', ->
  beforeEach ->
    htmlparser = require('lib/htmlparser')

  it 'could parse html contents', ->
    rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->"
    handler = new htmlparser.DefaultHandler( (error, dom)->
      if error
        Ti.API.info error
      else
      
    )  

    parser = new htmlparser.Parser(handler)
    parser.parseComplete(rawHtml)


    