describe 'Ciatr', ->
  beforeEach ->
    Ciatr = require("model/ciatr")
    @ciatr = new Ciatr()

  describe 'following method', ->
    contents = null
    statusID = 68553
    async = new AsyncSpec(@)
    async.beforeEach (done) =>
      runs ->
        @ciatr.status(statusID,(data)->
          contents = data
          done()
        )

    it 'get a number of following users', ->
      expect(contents.length).toBe 8

