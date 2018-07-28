import HCardT from '../type';

export function makeConfig(env: HCardT.Env): HCardT.Config {
  var config = <HCardT.Config>{
    staticRoot: env.STATIC_ROOT || './client/dist',
    ssrPath: '../../../client/dist/main.js',
    spaPath: '../../../client/dist/_index.html',
    serverPort: env.PORT || 3030,
    renderMode: env.RENDER_MODE || 'ssr',
    dbUri: env.DB_URL || 'mongodb://192.168.99.101:27017/domain',
    dbName: env.DB_NAME || 'hcard',
  }

  return config;
}