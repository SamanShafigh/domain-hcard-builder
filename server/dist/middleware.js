"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serveStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const tplService = require("./service/template-service");
/**
 * This middleware will add X-Response-Time
 */
function responseTime() {
    return async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    };
}
exports.responseTime = responseTime;
/**
 * This middleware will do some basic log activities
 */
function logger() {
    return async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    };
}
exports.logger = logger;
/**
 * This middleware will process some meta data, for example
 * JSON Web Tokens for user authenticate.
 * We can also here define in which mode we should serve the app
 * @param renderMode
 */
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
        var noscript = renderMode === 'ssr' || !userCanRunScript;
        ctx.meta = {
            // For now I set this to be a hardcoded ID
            userId: 'a01467ec-5903-40ed-8614-3e33953ca739',
            noscript: noscript
        };
        await next();
    };
}
exports.handleMeta = handleMeta;
/**
 * This middleware will handle errors, we can do more here
 */
function handleError() {
    return async (ctx, next) => {
        return next().catch((err) => {
            if (err.status == 401) {
                ctx.status = 401;
                ctx.body = `Oops! Protected resource, use Authorization\n`;
            }
            else {
                ctx.body = `Oops! We're having a problem. Error: ${err}\n`;
            }
        });
    };
}
exports.handleError = handleError;
/**
 * This middleware will parse form submitted data
 */
function handleParser() {
    return bodyParser();
}
exports.handleParser = handleParser;
/**
 * This middleware will serve the static files
 * @param root
 */
function handleStatic(root) {
    return serveStatic(root);
}
exports.handleStatic = handleStatic;
/**
 * This middleware will render a proper response based on
 * ctx.meta.noscript option and ctx.view content
 */
function renderView() {
    return async (ctx, next) => {
        // If we expect some restfull responses do this
        if (ctx.view.response !== undefined) {
            ctx.body = ctx.view.response;
        }
        else {
            // If noscript mode is defined and also a component is defined
            // we will perfomr server side rendering
            if (ctx.meta.noscript && ctx.view.component !== undefined) {
                ctx.body = tplService.render(ctx.view.component, ctx.view.props);
                // Otherwise we just serve a SPA landing page
            }
            else if (ctx.view.template !== undefined) {
                ctx.type = 'html';
                ctx.body = tplService.serve(ctx.view.template);
            }
        }
        await next();
    };
}
exports.renderView = renderView;
//# sourceMappingURL=middleware.js.map