const Router = require('koa-router');
const { makeUserController } = require('./controller/user-controller')

module.exports = (config, db) => {
  // Make my controllers with their DI
  var userCtrl = makeUserController(config, db)

  // Composing my routes
  var router = new Router();
  router
    .get('/', userCtrl.index())
    .post('/submit', userCtrl.submit())
    .post('/update', userCtrl.update());

  return router;
};