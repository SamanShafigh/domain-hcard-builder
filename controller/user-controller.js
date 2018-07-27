class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  index() {
    return async (ctx, next) => {
      ctx.body = await this.userService.getView();
    }
  }

  submit() {
    return async (ctx, next) => {
      ctx.body = await this.userService.submitUser();
    }
  }

  update() {
    return async (ctx, next) => {
      ctx.body = await this.userService.updateUser();
    }
  }
}

module.exports = UserController;
