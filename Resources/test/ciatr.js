
describe('Ciatr', function() {
  beforeEach(function() {
    var Ciatr;
    Ciatr = require("model/ciatr");
    return this.ciatr = new Ciatr();
  });
  return describe('following method', function() {
    var async, contents, statusID,
      _this = this;
    contents = null;
    statusID = 68553;
    async = new AsyncSpec(this);
    async.beforeEach(function(done) {
      return runs(function() {
        return this.ciatr.status(statusID, function(data) {
          contents = data;
          return done();
        });
      });
    });
    return it('get a number of following users', function() {
      return expect(contents.length).toBe(8);
    });
  });
});
