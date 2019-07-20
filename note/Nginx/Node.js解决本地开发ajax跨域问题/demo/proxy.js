/**
 * @author NZQ
 * @data 2019/1/15
 * @Description :
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(express.static('public'))

const apiProxy = proxy('/', { target: 'http://localhost:3001',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/*', apiProxy);//api子目录下的都是用代理

// Render your site
app.get('/index.htm', function(req,res){
  res.sendFile(__dirname+'./public/index.html');
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
