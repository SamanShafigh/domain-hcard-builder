"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../service/user-service");
const util_1 = require("../util");
/**
 * UserController is to abstract the user related controllers
 */
class UserController {
    constructor(userService, config) {
        this.userService = userService;
        this.config = config;
    }
    /** Get the view page */
    index() {
        return async (ctx, next) => {
            ctx.view = {
                component: this.config.ssrPath,
                template: this.config.spaPath,
                props: await this.userService.getUser(ctx.meta.userId)
            };
            await next();
        };
    }
    /** Submit a user data endpoint */
    submit() {
        return async (ctx, next) => {
            await this.userService.submitUser(ctx.meta.userId, ctx.request.body);
            ctx.view = {
                component: this.config.ssrPath,
                template: this.config.spaPath,
                props: await this.userService.getUser(ctx.meta.userId)
            };
            await next();
        };
    }
    /** Update user data endpoint */
    update() {
        return async (ctx, next) => {
            var { key, value } = util_1.getKeyValue(ctx.request.body);
            await this.userService.updateUser(ctx.meta.userId, key, value);
            ctx.view = {
                response: `user field ${key} get updated to ${value}`
            };
            await next();
        };
    }
}
/**
 * make makes a
 *
 * @param {*} config
 * @param {*} db
 */
function make(config, dbDriver) {
    return new UserController(new user_service_1.default(dbDriver), config);
}
exports.make = make;
//# sourceMappingURL=user-controller.js.map