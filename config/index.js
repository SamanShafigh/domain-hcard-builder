module.exports = (env) => {
  var config = {
    staticRoot: env.STATIC_ROOT || './public',
    serverPort: env.PORT || 3030,
  }

  return config;
}