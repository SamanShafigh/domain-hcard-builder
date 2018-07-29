import HCardT from '../../type';

export function makeConfig(env: HCardT.Env): HCardT.Config {
  var config = <HCardT.Config>{
    staticRoot: env.STATIC_ROOT || './client/dist',
    serverPort: env.PORT || 3030,
    renderMode: env.RENDER_MODE || 'ssr',
    dbUri: env.DB_URL || 'mongodb://localhost:27017',
    dbName: env.DB_NAME || 'domain-hcard',
  }

  return config;
}