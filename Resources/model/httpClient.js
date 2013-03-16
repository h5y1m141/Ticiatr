var httpClient,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

httpClient = (function() {

  function httpClient(args) {
    this._onloadHandler = __bind(this._onloadHandler, this);

    var _this = this;
    args = args || {};
    this.httpTimeout = args.httpTimeout || 5000;
    this.retryCount = args.retryCount || 2;
    this.retryWaitTime = args.retryWaitTime || 1000;
    this.currentRetryCount = 0;
    this.saveMethod = "";
    this.saveUrl = "";
    this.saveData = null;
    this.events = null;
    this.http = Ti.Network.createHTTPClient({
      onload: function(e) {
        return _this._onloadHandler(e);
      },
      onerror: function(error) {
        return _this._onerrorHandler(error);
      }
    });
  }

  httpClient.prototype.onload = function(callback) {
    var _this = this;
    return this.http.onload = function() {
      return callback(_this.responseText);
    };
  };

  httpClient.prototype.open = function(method, url) {
    this.saveMethod = method;
    this.saveUrl = url;
    return this.http.open(method, url);
  };

  httpClient.prototype.send = function(data) {
    this.saveData = data;
    return this.http.send(data);
  };

  httpClient.prototype.addEventListener = function(name, callback) {
    this.events = this.events || {};
    if (typeof this.events[name] === "undefined") {
      return this.events[name] = [callback];
    } else {
      return this.events[name].push(callback);
    }
  };

  httpClient.prototype.removeEventListener = function(name, callback) {
    if ((this.events != null) && typeof this.events[name] !== "undefined") {
      this.events = this.events.filter(function(filterCallback) {
        return callback === filterCallback;
      });
    }
    return true;
  };

  httpClient.prototype._request = function(method, url, callback) {
    var xhr,
      _this = this;
    xhr = Ti.Network.createHTTPClient();
    xhr.open(method, url);
    xhr.onload = function() {
      return callback(this.responseXML);
    };
    xhr.onerror = function(e) {
      var error;
      Ti.API.info("status code: " + _this.status);
      return error = JSON.parse(_this.responseText);
    };
    return xhr.send();
  };

  httpClient.prototype._onloadHandler = function(e) {
    if (e.source.responseText) {
      this.fireEvent("load", {
        data: e.source.responseText
      });
    } else {
      Ti.API.info("load event fired!! but data is null");
      this.fireEvent("load", {
        data: null
      });
    }
    return this.http = null;
  };

  httpClient.prototype.fireEvent = function(name, param) {
    if (this.events && typeof this.events[name] !== "undefined") {
      return this.events[name].forEach(function(callback) {
        try {
          return callback(param);
        } catch (e) {
          return Ti.API.error(e);
        }
      });
    }
  };

  httpClient.prototype._onerrorHandler = function(error) {
    var status,
      _this = this;
    status = error.source.status;
    Ti.API.error("[HTTPClient] Error! HTTP Status = " + status);
    Ti.API.error(error);
    if ((status === 0 || status >= 500) && this.currentRetryCount < this.retryCount) {
      setTimeout((function() {
        error.source.open(_this.saveMethod, _this.saveUrl);
        return error.source.send(_this.saveData);
      }), this.retryWaitTime);
      this.currentRetryCount += 1;
      return Ti.API.warn("[HTTPClient] Retry. Retry count = " + this.currentRetryCount);
    } else {
      this.fireEvent("error", {
        status: status,
        message: error.source.statusText
      });
      return this.http = null;
    }
  };

  return httpClient;

})();

module.exports = httpClient;
