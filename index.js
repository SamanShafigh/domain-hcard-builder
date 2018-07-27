const Koa = require('koa');
const routeMaker = require('./router')
const middleware = require('./middleware')
const config = require('./config')(process.env);

const app = new Koa();
const db = null
const router = routeMaker(config, db);

// Set my app custom middlewares
app
  .use(middleware.handleError())
  .use(middleware.responseTime())
  .use(middleware.logger())
  .use(middleware.handleParser())
  .use(middleware.handleStatic(config.staticRoot))
  .use(middleware.handleMeta(config.ssr));

// Set my app route middlewares
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(middleware.renderView());

app.listen(config.serverPort);