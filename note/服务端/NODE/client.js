const http = require('http');

const option = {
  host: 'localhost',
  port: 8082,
  path: '/index.html',
}

let cb = (res) => {
  let body = '';
  res.on('data', (data) => {
    body += data;
  })

  res.on('end', ()=> {
    console.log(body);
  })
}

http.request(option, cb).end();
