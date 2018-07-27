const Router = require('koa-router');

const UserCtrl = require('./controller/user-controller')
const UserService = require('./service/user-service')
const UserRepo = require('./repository/user-repository')

// Composing my DI Which I prefer to not do it manually like 
// this but for sake of simplicity here I will do it manually
var userService = new UserService(new UserRepo())
var userCtrl = new UserCtrl(userService)

// Composing my routes
var router = new Router();
router
  .get('/', userCtrl.index())
  .post('/submit', userCtrl.submit())
  .post('/update', userCtrl.update());

module.exports = router;