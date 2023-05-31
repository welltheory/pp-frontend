module.exports = {
  get: ({
    isEnvDevelopment,
    isEnvProduction,
  }) => {
    if (isEnvProduction) return 'production';
    if (isEnvDevelopment) return 'development';
  },
};


