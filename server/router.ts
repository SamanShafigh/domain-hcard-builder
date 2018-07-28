import * as Router from 'koa-router';
import { make as makeUserController } from './controller/user-controller';

export function makeRouter(config: any, db: any): Router {
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