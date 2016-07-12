var fs = require("fs"),
  path = require("path"),
  url = require("url"),
  util = require("util"),
  queryString = require("querystring"),
  types = require("./type").types,
  template = require('./node_modules/art-template'),
  ajaxTo = require("./ajax/ajaxto"),
  Controller = (function() {
    var handle_404 = function(pathname, request, response) {
        response.writeHead(404, {
          "Content-type": types.text
        });
        response.write("This request url " + pathname + " was not found on this server.");
        response.end();
      },
      Controller = function(config) {
        this.pathname = config.pathname || "";
        this.req = config.req;
        this.res = config.res;
        this.contentType = config.contentType;
      },
      send = {
        isExit: function(pathname, cb) {
          var self = this;
          fs.exists("." + pathname, function(exists) {
            if (!exists) {
              console.log("file is not found");
              handle_404(pathname, self.req, self.res);
              return;
            }
            cb();
          })
        },
        render: function() {
          var self = this,
            pathname = self.pathname,
            request = self.req,
            response = self.res,
            contentType = self.contentType;
          self.isExit(pathname, function() {
            //basename(pathname) is to get the name of file
            var baseName = path.basename(pathname, '.html'),
              html = template.renderFile('.' + '/src/index.html'.replace(/\.html$/, ''), {});
            response.writeHead(200, {
              "Content-Type": contentType
            });
            response.write(html);
            response.end();
            return;
          });
        },
        sendFile: function() {
          var self = this,
            pathname = self.pathname,
            request = self.req,
            response = self.res,
            contentType = self.contentType;
          self.isExit(pathname, function() {
            // the data of 2 scale
            fs.readFile("." + pathname, "binary", function(err, data) {
              if (err) {
                response.writeHead(500, {
                  "Content-Type": contentType
                });
                return response.end(err);
              }

              response.writeHead(200, {
                "Content-Type": contentType
              });
              response.write(data, "binary");
              response.end();
            });
            return;
          })
        },
        ajax: function() {
          var self = this,
            pathname = self.pathname,
            request = self.req,
            response = self.res,
            contentType = self.contentType;
          if (pathname.indexOf("api/") === -1) {
            response.writeHead(200, {
              "Content-Type": contentType
            });
            response.write("error!!!");
            response.end();
            return;
          }
          self.contentType = "application/json";
          response.writeHead(200, {
            "Content-Type": contentType
          });

          if (request.method.toUpperCase() === "GET") {
            //set the second para to true is to use the querystring module to query 
            var formatUrl = url.parse(request.url, true);
            ajaxTo(request, response, formatUrl);
          } else if (request.method.toUpperCase() === "POST") {
            var postData = "";
            request.setEncoding = 'utf8';
            request.on("data", function(chunk) {
              postData += chunk;
            });
            request.on("end", function() {
              var formatUrl = url.parse(request.url, true);
              postData = JSON.parse(postData);
              formatUrl._postData = JSON.stringify(postData);
              ajaxTo(request, response, formatUrl);
            })
          }
        }
      }
    for (var k in send) {
      Controller.prototype[k] = send[k];
    }

    return Controller;
  })();

module.exports = Controller;
