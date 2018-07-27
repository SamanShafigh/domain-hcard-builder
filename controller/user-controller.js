class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  index() {
    return async (ctx, next) => {
      throw new Error('sss');
      var userId = ctx.meta.userId;
      ctx.body = await this.userService.getView(userId);
    }
  }

  submit() {
    return async (ctx) => {
      var userId = ctx.meta.userId;
      var data = ctx.request.body;
      await this.userService.submitUser(userId, data);

      ctx.body = await this.userService.getView();
    }
  }

  update() {
    return async (ctx) => {
      ctx.body = await this.userService.updateUser();
    }
  }
}

module.exports = UserController;
