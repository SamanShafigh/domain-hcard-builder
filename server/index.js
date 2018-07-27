const Koa = require('koa');
const routeMaker = require('./router')
const middleware = require('./middleware')
const dbdriver = require('./service/dbdriver-service');
const config = require('./config')(process.env);

(async () => {
  const app = new Koa();
  const db = await dbdriver.connect(config);
  const router = routeMaker(config, db);
  
  // Set my app custom middlewares
  app
    .use(middleware.handleError())
    .use(middleware.responseTime())
    .use(middleware.logger())
    .use(middleware.handleParser())
    .use(middleware.handleStatic(config.staticRoot))
    .use(middleware.handleMeta(config.renderMode));
  
  // Set my app route middlewares
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(middleware.renderView());
  
  app.listen(config.serverPort, () => {
    console.log(`Server is running 
      Port: ${config.serverPort}
      Rendering mode: ${config.renderMode}
    `);
  });
})();
