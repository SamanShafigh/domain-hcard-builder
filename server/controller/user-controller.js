const UserService = require('../service/user-service')
const UserRepo = require('../repository/user-repository')
const { getKeyValue } = require('../util')

const USER_SSR_PATH = '../../client/dist/main.js';
const USER_SPA_PATH = '../../client/dist/_index.html';

class UserController {
  constructor(userService, config) {
    this.userService = userService;
    this.config = config;
  }

  index() {
    return async (ctx, next) => {
      ctx.view = {
        component: USER_SSR_PATH, 
        template:  USER_SPA_PATH,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  submit() {
    return async (ctx, next) => {
      await this.userService.submitUser(
        ctx.meta.userId, 
        ctx.request.body
      );

      ctx.view = {
        component: USER_SSR_PATH, 
        template:  USER_SPA_PATH,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  update() {
    return async (ctx, next) => {
      var { key, value } = getKeyValue(ctx.request.body);
      await this.userService.updateUser(
        ctx.meta.userId, 
        key,
        value
      );

      ctx.view = {
        response: `user field ${key} get updated to ${value}`
      }
      await next();
    }
  }
}

/**
 * makeUserController makes a 
 * 
 * @param {*} config 
 * @param {*} db 
 */
function makeUserController(config, db) {
  return new UserController(
    new UserService(
      new UserRepo(db)
    ),
    config
  )
}

module.exports = {
  UserController,
  makeUserController 
};
