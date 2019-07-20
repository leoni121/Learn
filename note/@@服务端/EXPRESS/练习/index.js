const express = require('express');
const app = express();
const router = require('./router');
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
})
// app.get
app.all('/', (req, res, next) => {
  let responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  req.responseText = "nzq";
  console.log(req.responseText);
  // res.end("nzq")
  next();
})
app.get('/try', function (req, res, next) {
  let responseText = '1111Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  req.responseText = responseText;
  console.log(req.responseText);
  next();
})
app.use('/', router);


app.listen('3001');
