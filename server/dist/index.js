"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const middleware = require("./middleware");
const router_1 = require("./router");
const config_1 = require("./config");
const dbdriver_service_1 = require("./service/dbdriver-service");
(async () => {
    const app = new Koa();
    const config = config_1.makeConfig(process.env);
    const db = await dbdriver_service_1.dbConnect(config.dbUri, config.dbName);
    const router = router_1.makeRouter(config, db);
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
//# sourceMappingURL=index.js.map