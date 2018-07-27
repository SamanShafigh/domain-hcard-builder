const BodyReceiver = require('bodyreceiver');
const serveStatic = require('koa-static');

function responseTime() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  }
}

function logger() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }
}

function user() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }
}

function authenticates() {
  return async (ctx, next) => {
    ctx.meta = {
      userId: 1
    }

    await next();
  }
}

function handleErrors() {
  return async (ctx, next) => {
    return next().catch((err) => {
      if (err.status == 401) {
        ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        ctx.body = `Opps we get ${err}\n`;
      }
    });
  }
}

function bodyParser() {
  var bodyReceiver = new BodyReceiver();

  return bodyReceiver.startup();
}

function static(root) {
  return serveStatic(root);
}

// Exposing my Public apis
module.exports = {
  responseTime,
  logger,
  authenticates,
  handleErrors,
  bodyParser,
  static,
}
