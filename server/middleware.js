const serveStatic = require('koa-static');
var bodyParser = require('koa-bodyparser');
const tplService = require('./service/template-service')

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


function handleMeta(renderMode) {
  return async (ctx, next) => {
    // Maybe we can use 
    // <noscript>
    //  <a href="link to an api end point to set user view mode">
    //    View this site in noscript mode
    //  </a>
    // </noscript>
    var userCanRunScript = true;

    // We can use ssr to force system to do server side rendering
    var noscript = renderMode === 'ssr' || !userCanRunScript
    console.log(noscript)
    ctx.meta = {
      userId: 1,
      noscript: noscript
    }

    await next();
  }
}

function handleError() {
  return async (ctx, next) => {
    return next().catch((err) => {
      if (err.status == 401) {
        ctx.status = 401;
        ctx.body = `Oops! Protected resource, use Authorization\n`;
      } else {
        ctx.body = `Oops! We're having a problem. Error: ${err}\n`;
      }
    });
  }
}

function handleParser() {
  return bodyParser();
}

function handleStatic(root) {
  return serveStatic(root);
}

function renderView() {
  return async (ctx, next) => {
    // If we expect some restfull responses do this
    if (ctx.view.response !== undefined) {
      ctx.body = ctx.view.response;
    } else {
      // If noscript mode is defined and also a component is defined
      // we will perfomr server side rendering
      if (ctx.meta.noscript && ctx.view.component !== undefined) {
        ctx.body = tplService.render(
          ctx.view.component, 
          ctx.view.props
        );
      // Otherwise we just serve a SPA landing page
      } else if (ctx.view.template !== undefined) {
        ctx.type = 'html'
        ctx.body = tplService.serve(ctx.view.template)
      } 
    }

    await next();
  }
}

// Exposing my Public apis
module.exports = {
  responseTime,
  logger,
  handleMeta,
  handleError,
  handleParser,
  handleStatic,
  renderView,
}
