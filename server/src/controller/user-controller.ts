import UserService from '../service/user-service'
import UserRepo from '../repository/user-repository'
import { getKeyValue } from '../util'
import HCardT from '../type';

/**
 * UserController is to abstract the user related controllers
 */
class UserController implements HCardT.UserController {
  userService: HCardT.UserService;
  config: HCardT.Config;

  constructor(userService: HCardT.UserService, config: HCardT.Config) {
    this.userService = userService;
    this.config = config;
  }

  /** Get the view page */
  index() {
    return async (ctx: HCardT.CTX, next: HCardT.Next) => {
      ctx.view = {
        component: this.config.ssrPath, 
        template:  this.config.spaPath,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  /** Submit a user data endpoint */
  submit() {
    return async (ctx: HCardT.CTX, next: HCardT.Next) => {
      await this.userService.submitUser(
        ctx.meta.userId, 
        ctx.request.body
      );

      ctx.view = {
        component: this.config.ssrPath, 
        template:  this.config.spaPath,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  /** Update user data endpoint */
  update() {
    return async (ctx: HCardT.CTX, next: HCardT.Next) => {
      var { key, value }: HCardT.KeyValue = getKeyValue(ctx.request.body);
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
 * make makes a 
 * 
 * @param {*} config 
 * @param {*} db 
 */
export function make(config: HCardT.Config, dbDriver: any): HCardT.UserController {
  return new UserController(
    new UserService(dbDriver),
    config
  )
}
