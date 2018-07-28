import * as Koa from "koa";
import * as middleware from './middleware';
import { makeRouter } from './router';
import { makeConfig } from './config';
import { dbConnect } from './service/dbdriver-service';

(async () => {
  const app = new Koa();
  const config = makeConfig(process.env)
  const db = await dbConnect(config.dbUri, config.dbName);
  const router = makeRouter(config, db);
  
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
