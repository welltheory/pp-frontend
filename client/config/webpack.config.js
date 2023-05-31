const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const Options = require('./options');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = false; // process.env.GENERATE_SOURCEMAP !== 'false';

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
  const shouldUseReactRefresh = env.raw.FAST_REFRESH;

  const params = {
    paths,
    modules,
    isEnvDevelopment,
    isEnvProduction,
    shouldUseReactRefresh,
    shouldUseSourceMap,
    isEnvProductionProfile,
    webpackDevClientEntry,
    reactRefreshOverlayEntry,
    env,
  };
  const cache = Options.Cache.get(params);
  const devtool = Options.Devtool.get(params);
  const entry = Options.Entry.get(params);
  const infrastructureLogging = { level: 'none' };
  const mode = Options.Mode.get(params);
  const module = Options.Module.get(params);
  const optimization = Options.Optimization.get(params);
  const output = Options.Output.get(params);
  const plugins = Options.Plugins.get(params);
  const resolve = Options.Resolve.get(params);
  return {
    bail: isEnvProduction,
    cache,
    devtool,
    entry,
    infrastructureLogging,
    mode,
    module,
    optimization,
    output,
    performance: false,
    plugins,
    resolve,
    stats: 'minimal',
    target: ['browserslist'],
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
  };
};
