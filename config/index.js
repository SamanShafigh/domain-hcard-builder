module.exports = (env) => {
  var config = {
    staticRoot: env.STATIC_ROOT || './client/dist',
    serverPort: env.PORT || 3030,
    ssr: true
  }

  return config;
}