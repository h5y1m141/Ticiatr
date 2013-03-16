var mainTable;

mainTable = (function() {

  function mainTable() {
    var _this = this;
    this.table = Ti.UI.createTableView({
      backgroundColor: '#ededed',
      separatorColor: '#999',
      zIndex: 2,
      width: 320,
      left: 0,
      top: 0
    });
    this.table.addEventListener('click', function(e) {
      if (e.rowData.className === 'entry') {

      } else if (e.rowData.className === "config") {

      } else {
        return Ti.API.info("tableView eventListener start. storedTo is " + e.rowData.storedTo);
      }
    });
  }

  mainTable.prototype.getTable = function() {
    return this.table;
  };

  mainTable.prototype.insertRow = function(index, row) {
    this.table.insertRowAfter(index, row, {
      animated: true
    });
    return true;
  };

  mainTable.prototype.hideLastRow = function() {
    var lastRow;
    lastRow = this.table.data[0].rows.length - 1;
    return this.table.deleteRow(lastRow);
  };

  mainTable.prototype.lastRowIndex = function() {
    return this.table.data[0].rows.length - 2;
  };

  mainTable.prototype.createRow = function(json) {
    var bodySummary, iconImage, row, starImage, textLabel;
    row = Ti.UI.createTableViewRow({
      width: 320,
      borderWidth: 2,
      color: '#999',
      borderColor: '#ededed',
      height: 120
    });
    iconImage = Ti.UI.createImageView({
      width: 80,
      height: 112,
      top: 5,
      left: 5,
      image: json.image
    });
    row.add(iconImage);
    textLabel = Ti.UI.createLabel({
      width: 200,
      height: 40,
      top: 0,
      left: 100,
      color: '#515151',
      font: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      text: json.title
    });
    row.add(textLabel);
    starImage = Ti.UI.createImageView({
      width: 80,
      height: 16,
      top: 40,
      left: 100,
      image: "ui/image/starset" + json.numberOfStar + ".png"
    });
    row.add(starImage);
    bodySummary = Ti.UI.createLabel({
      width: 180,
      height: 50,
      left: 120,
      top: 60,
      color: "#444",
      font: {
        fontSize: 12
      },
      text: json.description
    });
    row.add(bodySummary);
    row.data = json;
    row.className = 'entry';
    row.tags = json.tags;
    return row;
  };

  mainTable.prototype.createRowForLoadOldEntry = function(storedTo) {
    var row, textLabel;
    row = Ti.UI.createTableViewRow({
      touchEnabled: false,
      width: 320,
      height: 50,
      borderWidth: 2,
      backgroundColor: '#222',
      borderColor: '#ededed',
      selectedBackgroundColor: '#59BB0C'
    });
    textLabel = Ti.UI.createLabel({
      width: 320,
      height: 50,
      top: 0,
      left: 0,
      color: '#fff',
      font: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      text: '以前の投稿を読み込む',
      textAlign: 1
    });
    row.add(textLabel);
    row.className = 'loadOldEntry';
    row.storedTo = storedTo;
    return row;
  };

  return mainTable;

})();

module.exports = mainTable;
