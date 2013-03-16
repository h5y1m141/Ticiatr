class window
  constructor: () ->
    win = Ti.UI.createWindow
      title:'Ciatr'
      barColor:'#ff0000'
      navBarHidden: false
      tabBarHidden: false
      

    return win

   

module.exports = window    