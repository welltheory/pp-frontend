const fs = require('fs');
const createEnvironmentHash = require('../persistentCache/createEnvironmentHash');

module.exports = {
  get: ({
    env,
    paths,
  }) => {
    return {
      type: 'filesystem',
      version: createEnvironmentHash(env.raw),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
          fs.existsSync(f)
        ),
      },
    };
  },
};
