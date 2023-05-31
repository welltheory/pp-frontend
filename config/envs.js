const path = require('path');
const _ = require('lodash');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const Utils = {
  getBoolean: (val, defaultValue) => {
    if (typeof val === 'undefined') return defaultValue;
    if (val === null) return defaultValue;
    if (typeof val === 'boolean') return val;
    const normalized = val.toLowerCase();
    if (normalized === 'true') return true;
    return false;
  },
};

const env = process.env.NODE_ENV || 'development';
const config = {
  env,
  port: process.env.SERVER_PORT || 3030,
  clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
  apiURL: process.env.API_URL || 'http://localhost:3030',
  maintenanceMode: Utils.getBoolean(process.env.MAINTENANCE_MODE, false),
};

module.exports = {
  isProduction: () => config.env === 'production',
  isDevelopment: () => config.env === 'development',
  isTest: () => config.env === 'test',
  isCloud: () => !!process.env.GCLOUD_PROJECT,
  get: (key, defaultValue) => _.get(config, key, defaultValue),
};
