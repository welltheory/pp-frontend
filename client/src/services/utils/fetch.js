import _ from 'lodash';
import axios from 'axios';
import LS from '@utils/localStorage';
import Config from '@config';

const getBaseURL = (config) => {
  const base = config.baseURL || Config.getEnv('API.URL');
  if (!config.path) return base;
  return `${base}${config.path}`;
};

const getAccessToken = () => {
  const data = LS.findItem(key => key.includes('@@auth0spajs@@'));
  if (!data) return null;
  return _.get(data, 'body.access_token');
};

const constructHeaders = (options) => {
  const result = {};
  const accessToken = getAccessToken();
  if (accessToken) {
    result.Authorization = `Bearer ${accessToken}`;
  }
  const passedHeaders = options.headers || {};
  return {
    ...result,
    ...passedHeaders,
  };
};

class Fetch {
  constructor(config) {
    const baseURL = getBaseURL(config);
    this.api = axios.create({
      withCredentials: false,
      ...config,
      baseURL,
    });
  }

  request = async (method, url, options = {}) => {
    const {
      transformData,
      ...config
    } = options;
    const headers = constructHeaders(config);
    const requestConfig = {
      ...config,
      headers,
      method,
      url,
    };
    try {
      const response = await this.api(requestConfig);
      if (transformData) response.data = transformData(response.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  get = (url, options) => this.request('get', url, options);

  post = (url, options) => this.request('post', url, options);

  patch = (url, options) => this.request('patch', url, options);

  delete = (url, options) => this.request('delete', url, options);
}

export default Fetch;
