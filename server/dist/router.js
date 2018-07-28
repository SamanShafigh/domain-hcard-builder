"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_controller_1 = require("./controller/user-controller");
function makeRouter(config, db) {
    // Make my controllers with their DI
    var userCtrl = user_controller_1.make(config, db);
    // Composing my routes
    var router = new Router();
    router
        .get('/', userCtrl.index())
        .post('/submit', userCtrl.submit())
        .post('/update', userCtrl.update());
    return router;
}
exports.makeRouter = makeRouter;
;
//# sourceMappingURL=router.js.map