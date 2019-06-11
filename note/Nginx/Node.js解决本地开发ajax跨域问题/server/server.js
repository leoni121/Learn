const express = require('express');
const app = express();

app.get('/proxy', (req, res) => {
  res.send("proxy success");
})

const server = app.listen(3001, () => {
  let host = server.address().address
  let port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

