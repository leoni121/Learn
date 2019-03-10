const express = require('express');
const app = express();
const fs = require("fs");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const multer  = require('multer');
const util = require('util');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(cookieParser())

app.get('/index.html', function (req, res) {
  console.log("Cookies: " + util.inspect(req.cookies));
  res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload', function (req, res) {

  console.log(req.files[0]);  // 上传的文件信息

  let des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.files[0].originalname
        };
      }
      console.log( response );
      res.end( JSON.stringify( response ) );
    });
  });
})

let server = app.listen(8081, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
