class httpClient 
  constructor: (args) ->
    args = args or {}
    # HTTPClientのタイムアウト（ミリ秒）
    @httpTimeout = args.httpTimeout or 5000
    # リトライ回数
    @retryCount = args.retryCount or 2
    # リトライまでの待ち時間（ミリ秒）
    @retryWaitTime = args.retryWaitTime or 1000
    # 現在のリトライ回数
    @currentRetryCount = 0
    # リトライ用に保存しておくHttpClient用パラメータ
    @saveMethod = ""
    @saveUrl = ""
    @saveData = null
    @events = null

    # HTTPClientを生成する
    @http = Ti.Network.createHTTPClient(
      onload:(e)=>
        @._onloadHandler(e)
      onerror:(error)=>
        @._onerrorHandler(error)
    )

  onload:(callback)->
    @http.onload = =>
      callback(@responseText)

    

  open:(method, url)->
    # リトライに備えてデータを保存
    @saveMethod = method
    @saveUrl = url
    
    # HTTPClient.openを実行
    return @http.open(method, url)   
    
  send:(data) ->
    # リトライに備えてデータを保存
    @saveData = data
    return @http.send(data)


  addEventListener:(name, callback) ->

    @events = @events or {}

    if typeof @events[name] is "undefined"
      @events[name] = [callback]
    else
      @events[name].push callback



  removeEventListener:(name, callback) ->
    if @events? and typeof @events[name] isnt "undefined"
      @events = @events.filter((filterCallback) ->
        callback is filterCallback
      )

    return true

  _request:(method,url,callback) ->
    xhr = Ti.Network.createHTTPClient()
    xhr.open(method,url)
    xhr.onload = ->
      callback(@.responseXML)
        
    xhr.onerror = (e) =>
      Ti.API.info "status code: #{@status}"
      error = JSON.parse(@.responseText)
      
    xhr.send()    
    

  _onloadHandler:(e) =>
    if e.source.responseText
      @fireEvent("load",{data: e.source.responseText})
      
    else
      Ti.API.info "load event fired!! but data is null"
      @fireEvent("load",{data: null})

    @http = null

  fireEvent:(name,param) ->
    if @events and typeof @events[name] isnt "undefined"
      @events[name].forEach (callback) ->
        try
          callback param
        catch e
          Ti.API.error e

  _onerrorHandler:(error) ->
    status = error.source.status
    Ti.API.error("[HTTPClient] Error! HTTP Status = #{status}")
    Ti.API.error(error)

    if (status is 0 or status >= 500) and @currentRetryCount < @retryCount
      setTimeout (=>
        error.source.open @saveMethod, @saveUrl
        error.source.send @saveData
      ), @retryWaitTime
      @currentRetryCount += 1
      Ti.API.warn "[HTTPClient] Retry. Retry count = #{@currentRetryCount}"
    else
      # エラーイベントを発行
      @fireEvent "error",
        status: status
        message: error.source.statusText

      @http = null

module.exports = httpClient    
  