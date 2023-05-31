const fs = require('fs');
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve('@pmmmwh/react-refresh-webpack-plugin');
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve('@babel/runtime/helpers/esm/assertThisInitialized', {
  paths: [babelRuntimeEntry],
});
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

module.exports = {
  get: ({
    isEnvProductionProfile,
    modules,
    paths,
  }) => {
    // Check if TypeScript is setup
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const relativePath = name => path.resolve(process.cwd(), 'src', name);
    return {
      // This allows you to set a fallback for where Webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || [],
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
        '@app': relativePath('app'),
        '@components': relativePath('components'),
        '@config': relativePath('config'),
        '@utils': relativePath('utils'),
        '@integrations': relativePath('integrations'),
        '@hocs': relativePath('hocs'),
        '@redux': relativePath('redux'),
        '@router': relativePath('router'),
        '@routes': relativePath('routes'),
        '@schemas': relativePath('schemas'),
        '@services': relativePath('services'),
        '@setup': relativePath('setup'),
        '@assets': relativePath('assets'),
      },
      plugins: [
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshRuntimeEntry,
          reactRefreshWebpackPluginRuntimeEntry,
          babelRuntimeEntry,
          babelRuntimeEntryHelpers,
          babelRuntimeRegenerator,
        ]),
      ],
      fallback: {
        module: false,
        dgram: false,
        fs: false,
        http2: false,
        net: false,
        tls: false,
        child_process: false,
        'process/browser': require.resolve('process/browser'),
      },
      // fallback: {
      //   assert: "assert",
      //   buffer: "buffer",
      //   console: "console-browserify",
      //   constants: "constants-browserify",
      //   crypto: "crypto-browserify",
      //   domain: "domain-browser",
      //   events: "events",
      //   http: "stream-http",
      //   https: "https-browserify",
      //   os: "os-browserify/browser",
      //   path: "path-browserify",
      //   punycode: "punycode",
      //   process: "process/browser",
      //   querystring: "querystring-es3",
      //   stream: "stream-browserify",
      //   _stream_duplex: "readable-stream/duplex",
      //   _stream_passthrough: "readable-stream/passthrough",
      //   _stream_readable: "readable-stream/readable",
      //   _stream_transform: "readable-stream/transform",
      //   _stream_writable: "readable-stream/writable",
      //   string_decoder: "string_decoder",
      //   sys: "util",
      //   timers: "timers-browserify",
      //   tty: "tty-browserify",
      //   url: "url",
      //   util: "util",
      //   vm: "vm-browserify",
      //   zlib: "browserify-zlib"
      // },
    };
  },
};
