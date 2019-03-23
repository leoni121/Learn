/**
 * @author NZQ
 * @data 2019/3/11
 * @Description :
 */
/**
 * express中间件的实现和执行顺序
 *
 * Created by BadWaka on 2017/3/6.
 */
// var express = require('express');
var express = require('koa2');
const router = require('koa-router')()

var app = new express();
app.listen(3000, function () {
  console.log('listen 3000...');
});

function middlewareA(ctx, next) {
  console.log('middlewareA before next()');
  next();
  console.log('middlewareA after next()');
}

function middlewareB(ctx, next) {
  console.log('middlewareB before next()');
  next();
  console.log('middlewareB after next()');
}

function middlewareC(ctx, next) {
  console.log('middlewareC before next()');
  next();
  console.log('middlewareC after next()');
}

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);
router.get('/', async (ctx, next) => {
  console.log("nzq");
  ctx.response.body = '<h1>index page</h1>'
})
app.use(router.routes())

/*
*
* middlewareA before next()
middlewareB before next()
middlewareC before next()
nzq
middlewareC after next()
middlewareB after next()
middlewareA after next()
*
*/
