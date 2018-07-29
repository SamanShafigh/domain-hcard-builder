"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeConfig(env) {
    var config = {
        staticRoot: env.STATIC_ROOT || './client/dist',
        serverPort: env.PORT || 3030,
        renderMode: env.RENDER_MODE || 'ssr',
        dbUri: env.DB_URL || 'mongodb://localhost:27017',
        dbName: env.DB_NAME || 'domain-hcard',
    };
    return config;
}
exports.makeConfig = makeConfig;
//# sourceMappingURL=index.js.map