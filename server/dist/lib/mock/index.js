"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEnv = {
    STATIC_ROOT: 'root',
    PORT: 1234,
    RENDER_MODE: 'ssr',
    DB_URL: 'mongodb://localhost',
    DB_NAME: 'test'
};
exports.mockConfig = {
    staticRoot: './client/dist',
    ssrPath: './dist/main.js',
    spaPath: './dist/_index.html',
    serverPort: 3030,
    renderMode: 'ssr',
    dbUri: 'mongodb://localhost',
    dbName: 'hcard',
};
exports.mockUser = {
    givenName: 'givenName',
    surname: 'surname',
    email: 'email',
    phone: 'phone',
    houseNumber: 'houseNumber',
    street: 'street',
    suburb: 'suburb',
    state: 'state',
    postcode: 'postcode',
    country: 'country'
};
exports.mockInvalidUser = {
    givenName: 'givenName',
    email: 'email',
    houseNumber: 'houseNumber',
    suburb: 'suburb',
    postcode: 'postcode',
    invalidData: 'some Invalid data'
};
exports.mockCtx = {
    meta: {
        userId: '1234',
        noscript: true,
    }
};
exports.mockCtxWithBody = {
    meta: {
        userId: '1234',
        noscript: true,
    },
    request: {
        body: exports.mockUser
    }
};
exports.mockDbDriver = {
    findOne: (model, query, options) => (Promise.resolve({ data: exports.mockUser })),
    save: (model, query, data, options) => ({ model, query, data, options }),
    update: (model, query, data, options) => ({ model, query, data, options }),
};
exports.mockMongoDbDriver = {
    collection: (model) => ({
        findOne: (query, options) => Promise.resolve({ model, query, options }),
        update: (query, data, options) => Promise.resolve({ model, query, data, options }),
    })
};
exports.mockReactComponentPath = '../lib/mock/component.mock.js';
exports.mockHtmlPagePath = '../lib/mock/page.mock.html';
//# sourceMappingURL=index.js.map