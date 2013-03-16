var window;

window = (function() {

  function window() {
    var win;
    win = Ti.UI.createWindow({
      title: 'Ciatr',
      barColor: '#ff0000',
      navBarHidden: false,
      tabBarHidden: false
    });
    return win;
  }

  return window;

})();

module.exports = window;
