class mainTable
  constructor: () ->
    @table = Ti.UI.createTableView
      backgroundColor:'#ededed'
      separatorColor: '#999'
      zIndex:2
      width:320
      left:0
      top:0

            
    @table.addEventListener('click',(e) =>
      # TableViewの一番下に、過去投稿を読み込むためのボタンを
      # 配置しており、そのrowだけは投稿詳細画面に遷移させない
      # 詳細画面にいくかどうかはrowのclassNameの値をチェックする

      if e.rowData.className is 'entry'
        
        # 一覧画面から詳細画面に遷移した後、該当の投稿情報を
        # ストックする際にURLやuuidの情報が必要になるために
        # sessionItem()を利用する

      else if e.rowData.className is "config"

      else
        Ti.API.info "tableView eventListener start. storedTo is #{e.rowData.storedTo}"
    )
    
  getTable: ()->
    return @table
  insertRow: (index,row)->
    @table.insertRowAfter(index,row,{animated:true})
    return true
    
  hideLastRow: () ->
    #以前の投稿が存在しない場合には、読み込むボタンを配置した
    # rowを非表示にしたいのでそのためのメソッド
    lastRow = @table.data[0].rows.length-1
    @table.deleteRow lastRow
    
  lastRowIndex: () ->
    # TableViewの行から2を引くことで最後のRowのindexを取得してるが
    # 理由は下記２点のため
    # 1.Rowの一番下にボタンとなるものを配置しているのでその分のRowを無視するためマイナス１する
    # 2.Rowの先頭は0から始まっているので、そのためにマイナス１する。

    return @table.data[0].rows.length-2
  createRow: (json) ->
    row = Ti.UI.createTableViewRow
      width:320
      borderWidth:2
      color:'#999'
      borderColor:'#ededed',
      height:120
      
    
    
    iconImage = Ti.UI.createImageView
      width:80
      height:112
      top:5
      left:5
      image:json.image
    row.add(iconImage)

    textLabel = Ti.UI.createLabel
      width:200
      height:40
      top:0
      left:100
      color:'#515151'
      font:
        fontSize:16
        fontWeight:'bold'
      text:json.title
    row.add(textLabel)
    
    starImage = Ti.UI.createImageView
      width:80
      height:16
      top:40
      left:100
      image:"ui/image/starset#{json.numberOfStar}.png"
    row.add(starImage)

    bodySummary = Ti.UI.createLabel
      width:180
      height:50
      left:120
      top:60
      color:"#444"
      font:
        fontSize:12
      text:json.description
    row.add(bodySummary)
    row.data = json
    row.className = 'entry'
    row.tags = json.tags

    return row
  createRowForLoadOldEntry: (storedTo) ->
    row = Ti.UI.createTableViewRow
      touchEnabled:false
      width:320
      height:50
      borderWidth:2
      backgroundColor:'#222',
      borderColor:'#ededed',
      selectedBackgroundColor:'#59BB0C'
    textLabel = Ti.UI.createLabel
      width:320
      height:50
      top:0
      left:0
      color:'#fff'
      font:
        fontSize:16
        fontWeight:'bold'
      text:'以前の投稿を読み込む',
      textAlign:1
    row.add(textLabel)
    row.className = 'loadOldEntry'
    row.storedTo = storedTo
    return row
    
module.exports = mainTable


