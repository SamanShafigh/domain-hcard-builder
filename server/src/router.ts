import * as Router from 'koa-router';
import HCardT from './type';
import { make as makeUserController } from './controller/user-controller';

export function makeRouter(config: HCardT.Config, dbDriver: HCardT.DbDriver): Router {
  // Make my controllers with their DI
  var userCtrl = makeUserController(config, dbDriver)

  // Composing my routes
  var router = new Router();
  router
    .get('/', userCtrl.index())
    .post('/submit', userCtrl.submit())
    .post('/update', userCtrl.update());

  return router;
};