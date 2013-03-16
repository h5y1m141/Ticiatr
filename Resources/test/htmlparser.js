
describe('httpClient', function() {
  beforeEach(function() {
    var htmlparser;
    return htmlparser = require('lib/htmlparser');
  });
  return it('could parse html contents', function() {
    var handler, parser, rawHtml;
    rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
    handler = new htmlparser.DefaultHandler(function(error, dom) {
      if (error) {
        return Ti.API.info(error);
      } else {

      }
    });
    parser = new htmlparser.Parser(handler);
    return parser.parseComplete(rawHtml);
  });
});
