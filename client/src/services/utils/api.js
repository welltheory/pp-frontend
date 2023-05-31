import axios from 'axios';
import Config from '@config';
import Fetch from './fetch';

const Utils = {
  getBaseURL: (config) => {
    const base = config.baseURL || Config.getEnv('API.url');
    if (!config.path) return base;
    return `${base}${config.path}`;
  },
};

class API {
  constructor({ config = {}, getEndpoints } = {}) {
    const baseURL = Utils.getBaseURL(config);
    const api = axios.create({
      withCredentials: false,
      ...config,
      baseURL,
    });
    this.fetch = new Fetch(api);
    this.assignEndpoints(getEndpoints);
  }


  assignEndpoints = (getEndpoints) => {
    if (!getEndpoints) return;
    const endpoints = getEndpoints({ fetch: this.fetch });
    Object.assign(this, endpoints);
  };
}

window.axios = axios;

export default API;
