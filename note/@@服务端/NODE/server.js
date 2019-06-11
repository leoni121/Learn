/**
 * @Author nzq
 * @Date 2019/4/3
 * @Description:
 * @Param:
 * @Return:
 */
let express = require('express');
let app = express();
let fs = require("fs");

let bodyParser = require('body-parser');
let multer  = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer(storage).array('image'));

app.get('/index.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/file_upload', function (req, res) {

/*  console.log(req.files[0]);  // 上传的文件信息*/

  let des_file = __dirname + "/" + req.files[0].originalname;
  /*fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.files[0].originalname,
          try: '倪志强'
        };
      }
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.end( JSON.stringify( response ) );
    });
  });*/
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  res.end( JSON.stringify( {} ) );
})

let server = app.listen(8081,'127.0.0.1', function () {

  let host = server.address().address
  let port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
