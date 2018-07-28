import HCardT from './type';

export const mockEnv = <HCardT.Env>{
  STATIC_ROOT: 'root',
  PORT: 1234,
  RENDER_MODE: 'ssr',
  DB_URL: 'mongodb://localhost',
  DB_NAME: 'test'
};

export const mockConfig = {
  staticRoot: './client/dist',
  ssrPath: './dist/main.js',
  spaPath: './dist/_index.html',
  serverPort: 3030,
  renderMode: 'ssr',
  dbUri: 'mongodb://localhost',
  dbName: 'hcard',
}

export const mockUser = {
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
}

export const mockInvalidUser = {
  givenName: 'givenName',
  email: 'email',
  houseNumber: 'houseNumber',
  suburb: 'suburb',
  postcode: 'postcode',
  invalidData: 'some Invalid data'
}

export const mockCtx = {
  meta: {
    userId: '1234',
    noscript: true,
  }
}

export const mockCtxWithBody = {
  meta: {
    userId: '1234',
    noscript: true,
  },
  request: {
    body: mockUser
  }
}

export const mockDbDriver = {
  findOne: (model, query, options) => (Promise.resolve({ data: mockUser })),
  save: (model, query, data, options) => ({ model, query, data, options }),
  update: (model, query, data, options) => ({ model, query, data, options }),
}

export const mockMongoDbDriver = {
  collection: (model) => ({
    findOne: (query, options) => Promise.resolve({ model, query, options }),
    update: (query, data, options) => Promise.resolve({ model, query, data, options}),
  })
}

export const mockReactComponentPath = '../mock/component.mock.js'
export const mockHtmlPagePath = '../mock/page.mock.html'