const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Kcors  = require('kcors');
const index = require('./routes/index');
const users = require('./routes/users');
const jwt = require('koa-jwt');
const verifyToken = require('./middlreware/verifyToken');
const secret = require('./config/secret.config');
const cors = require('koa2-cors');
// error handler
onerror(app);

app.use(verifyToken());

// Cors
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        return "*"; // 允许来自所有域名请求
        // }
        // return "http://localhost:8080"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// /^\/users\/checkCors/
app.use(jwt({secret: secret.sign}).unless({path: [/^\/users\/bar/, /^\/users\/login/, /^\/users\/register/, /^\/users\/getUserInfo/]}));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
