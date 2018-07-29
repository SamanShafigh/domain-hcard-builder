"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeConfig(env) {
    var config = {
        staticRoot: env.STATIC_ROOT || './client/dist',
        serverPort: env.PORT || 3030,
        renderMode: env.RENDER_MODE || 'ssr',
        dbUri: env.DB_URL || 'mongodb://192.168.99.101:27017/domain',
        dbName: env.DB_NAME || 'hcard',
    };
    return config;
}
exports.makeConfig = makeConfig;
//# sourceMappingURL=index.js.map