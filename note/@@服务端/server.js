/**
 * @Author nzq
 * @Date 2019/4/18
 * @Description:
 * @Param:
 * @Return:
 */
var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(301, {'Location': 'http://itbilu.com/'});
  console.log(res._header);
  res.end();
});

server.listen(3017);
