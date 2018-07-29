"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../service/user-service");
const error_1 = require("../lib/error");
const util_1 = require("../util");
exports.View = {
    // This component is used for a ssr
    component: '../../../client/dist/main.js',
    // This template file is used for serving a spa
    template: '../../../client/dist/_index.html',
};
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
            // Validate incoming data. This is a naive implementation
            if (ctx.meta.userId === undefined) {
                throw new error_1.InvalidDataError('User ID is not provided');
            }
            ctx.view = {
                component: exports.View.component,
                template: exports.View.template,
                props: await this.userService.getUser(ctx.meta.userId)
            };
            await next();
        };
    }
    /** Submit a user data endpoint */
    submit() {
        return async (ctx, next) => {
            // Validate incoming data. This is a naive implementation
            if (ctx.meta.userId === undefined) {
                throw new error_1.InvalidDataError('User ID is not provided');
            }
            await this.userService.submitUser(ctx.meta.userId, ctx.request.body);
            ctx.view = {
                component: exports.View.component,
                template: exports.View.template,
                props: await this.userService.getUser(ctx.meta.userId)
            };
            await next();
        };
    }
    /** Update user data endpoint */
    update() {
        return async (ctx, next) => {
            // Validate incoming data. This is a naive implementation
            if (ctx.meta.userId === undefined) {
                throw new error_1.InvalidDataError('User ID is not provided');
            }
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