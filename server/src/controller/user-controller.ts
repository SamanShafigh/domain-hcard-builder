import UserService from '../service/user-service';
import { InvalidDataError } from '../lib/error';
import { getKeyValue } from '../util';
import HCardT from '../type';

export const View = {
  // This component is used for a ssr
  component: '../../../client/dist/main.js',
  // This template file is used for serving a spa
  template: '../../../client/dist/_index.html',
}

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
      // Validate incoming data. This is a naive implementation
      if (ctx.meta.userId === undefined) {
        throw new InvalidDataError('User ID is not provided');
      }

      // Here I just compose a view object that is used in my middleware:renderView
      // function. Based on the user view mode we will render a proper response whether 
      // a spa or a ssr page
      ctx.view = {
        component: View.component, 
        template:  View.template,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  /** Submit a user data endpoint */
  submit() {
    return async (ctx: HCardT.CTX, next: HCardT.Next) => {
      // Validate incoming data. This is a naive implementation
      if (ctx.meta.userId === undefined) {
        throw new InvalidDataError('User ID is not provided');
      }

      await this.userService.submitUser(
        ctx.meta.userId, 
        ctx.request.body
      );

      ctx.view = {
        component: View.component, 
        template:  View.template,
        props: await this.userService.getUser(ctx.meta.userId)
      }
      await next();
    }
  }

  /** Update user data endpoint */
  update() {
    return async (ctx: HCardT.CTX, next: HCardT.Next) => {
      // Validate incoming data. This is a naive implementation
      if (ctx.meta.userId === undefined) {
        throw new InvalidDataError('User ID is not provided');
      }

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
 * make makes a UserController object
 * 
 * @param {*} config 
 * @param {*} dbDriver 
 */
export function make(config: HCardT.Config, dbDriver: any): HCardT.UserController {
  return new UserController(
    new UserService(dbDriver), 
    config
  );
}
