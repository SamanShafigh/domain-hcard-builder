import * as serveStatic from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as tplService from './service/template-service';
import { InvalidDataError } from './lib/error';
import HCardT from './type';

/**
 * This middleware will add X-Response-Time
 */
export function responseTime() {
  return async (ctx: HCardT.CTX, next: HCardT.Next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  }
}

/**
 * This middleware will do some basic log activities
 */
export function logger() {
  return async (ctx: HCardT.CTX, next: HCardT.Next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }
}

/**
 * This middleware will process some meta data, for example 
 * JSON Web Tokens for user authenticate.
 * We can also here define in which mode we should serve the app
 * @param renderMode 
 */
export function handleMeta(renderMode: string) {
  return async (ctx: HCardT.CTX, next: HCardT.Next) => {
    // Maybe we can use 
    // <noscript>
    //  <a href="link to an api end point to set user view mode">
    //    View this site in noscript mode
    //  </a>
    // </noscript>
    var userCanRunScript = true;

    // We can use ssr to force system to do server side rendering
    var noscript = renderMode === 'ssr' || !userCanRunScript
    ctx.meta = {
      // For now I set this to be a hardcoded ID
      userId: 'a01467ec-5903-40ed-8614-3e33953ca739',
      noscript: noscript
    }

    await next();
  }
}

/**
 * This middleware will handle errors, we can do more here
 */
export function handleError() {
  return async (ctx: HCardT.CTX, next: HCardT.Next) => {
    return next().catch((err: HCardT.Error) => {
      if (err instanceof InvalidDataError) {
        ctx.status = 400;
        ctx.body = `Oops! Invalid data. Error: ${err.message}\n`;
      } else if (err.status == 401) {
        ctx.status = 401;
        ctx.body = `Oops! Protected resource, use Authorization\n`;
      } else {
        ctx.body = `Oops! We're having a problem. Error: ${err.message}\n`;
      }
    });
  }
}

/**
 * This middleware will parse form submitted data
 */
export function handleParser() {
  return bodyParser();
}

/**
 * This middleware will serve the static files
 * @param root 
 */
export function handleStatic(root: string) {
  return serveStatic(root);
}

/**
 * This middleware will render a proper response based on 
 * ctx.meta.noscript option and ctx.view content
 */
export function renderView() {
  return async (ctx: HCardT.CTX, next: HCardT.Next) => {
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