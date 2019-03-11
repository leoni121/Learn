function express () {
  let funs = []; // 待执行的数组

  let app = function (req, res) {
    let task, i = 0;
    // 递
    function next() {
      task = funs[i++];
      if (task) {
        task(req, res, next);
      }
    }
    next();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!')
  }

  app.use = function (task) {
    funs.push(task)
  }

  return app;
}

module.exports = express
