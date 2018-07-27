const Koa = require('koa');
const serveStatic = require('koa-static');
const router = require('./router')

const app = new Koa();

app
  .use(serveStatic('./public'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3030);