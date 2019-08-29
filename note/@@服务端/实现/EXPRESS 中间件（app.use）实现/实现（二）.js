/**
 * @Author nzq
 * @Date 2019/3/23
 * @Description: 参考 https://segmentfault.com/a/1190000010877994（感谢分享）
 * @Param:
 * @Return:
 */

class Express {
  constructor () {
    this.init();
  }

  init() {
    this.request = { //模拟的request
      requestLine: 'POST /iven_ HTTP/1.1',
      headers: 'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0',
      requestBody: 'key1=value1&key2=value2&key3=value3',
    };

    this.response = {}; //模拟的response
    this.chain = []; //存放中间件的一个数组
    this.index = 0; //当前执行的中间件在chain中的位置
  }


  use(handle) { //这里默认 handle 是函数，并且这里不做判断
    this.chain.push(handle);
  }


  next() { //当调用next时执行index所指向的中间件
    if (this.index >= this.chain.length)
      return;
    let middleware = this.chain[this.index];
    this.index++;
    middleware(this.request, this.response, this.next.bind(this));
  }

}

function lineParser(req, res, next) {
  let items = req.requestLine.split(' ');
  req.methond = items[0];
  req.url = items[1];
  req.version = items[2];
  next(); //执行下一个中间件
}

function headersParser(req, res, next) {
  let items = req.headers.split('\r\n');
  let header = {}
  for(let i in items) {
    let item = items[i].split(':');
    let key = item[0];
    let value = item[1];
    header[key] = value;
  }
  req.header = header;
  next(); //执行下一个中间件
}

function bodyParser(req, res, next) {
  let bodyStr = req.requestBody;
  let body = {};
  let items = bodyStr.split('&');
  for(let i in items) {
    let item = items[i].split('=');
    let key = item[0];
    let value = item[1];
    body[key] = value;
  }
  req.body = body;
  next(); //执行下一个中间件
}

function middleware3(req, res, next) {
  console.log('url: '+req.url);
  console.log('method: '+req.methond);
  console.log('version: '+req.version);
  console.log(req.body);
  console.log(req.header);
  next(); //执行下一个中间件
}

let app = new Express();
app.use(lineParser);
app.use(headersParser);
app.use(bodyParser);
app.use(middleware3);
app.next();
