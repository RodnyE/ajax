
Ajax = function () {
  this.isSupported = !!this.createHttpRequest();
};


// POST
Ajax.prototype.post = function (url, data, callback) {
  let http = this.createHttpRequest(callback);
  
  http.open('POST', url, true);
  // detectar MIME type
  /*
    application/json
    application/x-www-form-urlencoded
    multipart/form-data
    text/plain
   */
  let mime = null;
  if (data instanceof FormData) mime = "multipart/form-data";
  else if (typeof data == "string") mime = "application/x-www-form-urlencoded";
  else if (typeof data == "object") {
    mime = "application/json";
    data = JSON.stringify(data);
  }

  if (mime) http.setRequestHeader('Content-Type', mime);
  http.send(data);
};

// GET
Ajax.prototype.get = function (url, callback) {
  let http = this.createHttpRequest(callback);
  http.open('GET', url, true);
  http.send(null);
};

//crear instancia XMLHttpRequest
Ajax.prototype.createHttpRequest = function (callback) {
  let that = this;
  let http = null;

  if (window.XMLHttpRequest) {
    http = new XMLHttpRequest();
    if (http.overrideMimeType) http.overrideMimeType('text/xml');
  } 
  // soporte para IE
  else if (window.ActiveXObject) {
    try {
      http = new ActiveXObject("Msxml2.XMLHTTP");
    } 
    catch (err) {
      try {
        http = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (err) {}
    }
  }
  
  if (http) http.onreadystatechange = function () {
    if (http.readyState == 4) {
      http.data = that.parseData(http.responseText);
      callback(http);
      that = http = null;
    }
  };

  return http;
};

// convertir a objeto
Ajax.prototype.parseData = function (data) {
  try {
    return JSON.parse(data);
  }
  catch (e) {
    return data;
  }
};

// convertir a query string
Ajax.prototype.createQuery = function (data) {
  let query = "";
  for (let dataProp in data) {
    let dataValue = data[dataProp];
    query += "&" + encodeURIComponent(dataProp) + "=" + encodeURIComponent(dataValue);
  }
  return query.replace(/^\&/, "");
};

// decodificar query string
Ajax.prototype.parseQuery = function (query) {
  let data = {};
  for (let line of query.split("&")) {
    line = line.split("=");
    let dataProp = decodeURIComponent(line[0]);
    let dataValue = decodeURIComponent(line[1]);
    data[dataProp] = dataValue;
  }
  return data;
};