
describe('httpClient', function() {
  beforeEach(function() {
    var httpClient;
    httpClient = require('model/httpClient');
    return this.client = new httpClient();
  });
  it('should be object', function() {
    return expect(typeof this.client).toBe("object");
  });
  it('has Ti.NetworkHttpClient object', function() {
    return expect(typeof this.client.http).toBe("object");
  });
  describe('parameter', function() {
    it('has Timeout seconds', function() {
      return expect(this.client.httpTimeout).toBe(5000);
    });
    it('has a number of retry', function() {
      return expect(this.client.retryCount).toBe(2);
    });
    return it('has a waitTime parameter', function() {
      return expect(this.client.retryWaitTime).toBe(1000);
    });
  });
  describe('event handler', function() {
    return it('could be add event', function() {
      this.client.addEventListener('load', function() {});
      return expect(typeof this.client.events).toBe("object");
    });
  });
  describe('HTTPClient main function', function() {
    var async, contents,
      _this = this;
    contents = null;
    async = new AsyncSpec(this);
    async.beforeEach(function(done) {
      return runs(function() {
        return this.client._request('GET', 'http://ciatr.jp/honeycandybaby/following', function(data) {
          contents = data;
          return done();
        });
      });
    });
    return it('get a contents from Ciatr', function() {
      return expect(contents).toContain("div");
    });
  });
  describe('HTTPClient @sngmr style', function() {
    var async, contents,
      _this = this;
    contents = null;
    async = new AsyncSpec(this);
    async.beforeEach(function(done) {
      return runs(function() {
        this.client.addEventListener('load', function(e) {
          contents = e.data;
          return done();
        });
        this.client.open('GET', 'http://ciatr.jp/honeycandybaby/following');
        return this.client.send();
      });
    });
    return it('get a contents from Ciatr', function() {
      return expect(contents).toContain("div");
    });
  });
});
