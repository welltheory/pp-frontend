module.exports = {
  get: ({
    isEnvDevelopment,
    isEnvProduction,
    shouldUseSourceMap,
  }) => {
    if (isEnvProduction) {
      return shouldUseSourceMap ? 'source-map' : false;
    }
    return isEnvDevelopment && 'cheap-module-source-map';
  },
};
