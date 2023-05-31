import _ from 'lodash';

const Transforms = {
  number: v => parseFloat(v),
  bool: v => `${v}` === 'true',
  array: (v = '') => v.split(',').map(r => r.trim()),
};

class Config {
  constructor() {
    this.env = {
      ...process.env,
      ...window.__ENVS__,
    };
    this.data = {};
    this.log('Envs:', { raw: this.env, parsed: this.data });
    this.registerRuntimeEnv('nodeEnv', 'NODE_ENV', { defaultValue: 'development' });
    this.registerRuntimeEnv('host', 'HOST', { defaultValue: 'localhost' });
    this.registerRuntimeEnv('port', 'PORT', { defaultValue: 3008, transform: 'number' });
    this.registerRuntimeEnv('analytics.GAID', 'ANALYTICS_GA_ID', { defaultValue: '' });
    this.registerRuntimeEnv('analytics.HJID', 'ANALYTICS_HOTJAR_ID', { defaultValue: '' });
    this.registerRuntimeEnv('API.URL', 'API_URL', { defaultValue: `http://${window.location.hostname}:3030/v1` });
    this.registerRuntimeEnv('Client.URL', 'CLIENT_URL', { defaultValue: `http://${window.location.hostname}:3000` });
    this.registerRuntimeEnv('Stripe.publicKey', 'STRIPE_PUBLIC_KEY');
    this.registerRuntimeEnv('pipelinePhase', 'PIPELINE_PHASE');
  }

  log = (msg, ...args) => {
    if (process.env.NODE_ENV === 'production') return;
    console.log(`[Config] ${msg}`, ...args);
  };

  registerRuntimeEnv = (key, name, options = {}) => {
    if (!_.isUndefined(options.dev) && process.env.NODE_ENV === 'development') return options.dev;
    let value = this.env[`REACT_APP_${name}`] || this.env[name];
    const { transform, defaultValue } = options;
    if (typeof value === 'undefined') {
      value = defaultValue;
    } else if (transform) {
      const method = Transforms[transform];
      value = method ? method(value) : value;
    }
    _.set(this.data, key, value);
    if (process.env.NODE_ENV === 'development') {
      window.config = this.data;
    }
    return value;
  };

  getEnv = (path) => _.get(this.data, path);

  isDevelopment = () => this.getEnv('nodeEnv') === 'development';

  isProduction = () => this.getEnv('nodeEnv') === 'production';

  isProductionPipeline = () => this.getEnv('pipelinePhase') === 'production';

  getHealthieURL = (path) => {
    const { Healthie } = this.data;
    if (!path) return Healthie.domain;
    return `${Healthie.domain}${path}`;
  };
}

const config = new Config();

export default config;
