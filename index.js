const Koa = require('koa');
const router = require('./router')
const middleware = require('./middleware')
const config = require('./config')(process.env);

const app = new Koa();

// Set my app custom middlewares
app
  .use(middleware.handleErrors())
  .use(middleware.responseTime())
  .use(middleware.logger())
  .use(middleware.bodyParser())
  .use(middleware.static(config.staticRoot))
  .use(middleware.authenticates());

// Set my app route middlewares
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.serverPort);