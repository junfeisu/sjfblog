var path = require("path"),
  types = require("../type").types;
const TYPE_HTML = "html";
const UNKNOWN = "unknown";

function route(pathname, request, response) {
  if (pathname === '/'){
    pathname = '/static/index.html';
  }

  function onResponse(pathname, request, response) {
    //get the type of file
    var ext = path.extname(pathname);
    //to remove the '.'
    ext = ext ? ext.slice(1) : UNKNOWN;
    var config = {
      pathname: pathname,
      contentType: ext !== UNKNOWN ? types[ext] : "text/plain",
      req: request,
      res: response
    };
    //the constructor
    var __controller = new Controller(config);
    if (ext === UNKNOWN) {
      __controller.ajax();
      return;
    } else if (ext === TYPE_HTML) {
      __controller.render();
      return;
    } else {
      __controller.sendFile();
      return;
    }
  }
  onResponse(pathname, request, response);
}

module.exports = route;
