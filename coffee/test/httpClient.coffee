describe 'httpClient', ->
  beforeEach ->
    httpClient = require('model/httpClient')
    @client = new httpClient()

  it 'should be object', ->
    expect(typeof @client).toBe "object"

  it 'has Ti.NetworkHttpClient object', ->
    expect(typeof @client.http).toBe "object"


  describe 'parameter', ->
    it 'has Timeout seconds', ->
      expect(@client.httpTimeout).toBe 5000
  

    it 'has a number of retry', ->
      expect(@client.retryCount).toBe 2

    it 'has a waitTime parameter', ->
      expect(@client.retryWaitTime).toBe 1000

  describe 'event handler', ->
    it 'could be add event', ->
      @client.addEventListener('load',()-> )
      expect(typeof @client.events).toBe "object"


  describe 'HTTPClient main function', ->
    contents = null
    async = new AsyncSpec(@)
    async.beforeEach (done) =>
      runs ->
        @client._request('GET','http://ciatr.jp/honeycandybaby/following',(data)->
          contents = data
          done()
        )

    it 'get a contents from Ciatr', ->
      expect(contents).toContain("div")

  describe 'HTTPClient @sngmr style', ->
    contents = null
    async = new AsyncSpec(@)
    async.beforeEach (done) =>
      runs ->
        @client.addEventListener('load',(e)->
          contents = e.data
          done()
        )
        @client.open('GET','http://ciatr.jp/honeycandybaby/following')
        @client.send()

    it 'get a contents from Ciatr', ->
      expect(contents).toContain("div")

  return