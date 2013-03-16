testsEnabled = false

if testsEnabled is true
  require('test/tests')
else
  mainWindow = require("ui/window")
  win = new mainWindow()
  Ciatr = require("model/ciatr")
  _ = require("lib/underscore-min")
  
  MainTable = require("ui/mainTable")
  mainTableView = new MainTable()
  mainTable = mainTableView.getTable()
  mainController = require("controller/mainController")
  controller = new mainController()
  ciatr = new Ciatr()
  movieList = ciatr.showPlayingMovieLists()


  controller.run()
  win.add mainTable
  
  tabGroup = Ti.UI.createTabGroup()
  
  mainTab = Ti.UI.createTab
    window: win
    icon:"ui/image/light_home@2x.png"
    
  tabGroup.addTab mainTab

  win.hideTabBar()
  tabGroup.open()