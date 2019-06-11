const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  console.log(body.name);
  ctx.body = { name: body.name };
};

app.use(koaBody());

app.use(main);
app.listen(3000);
