import _ from 'lodash';

const JSONParser = {
  parse: (string) => {
    if (!string) return string;
    const isObject = string.startsWith('{') && string.endsWith('}');
    const isArray = string.startsWith('[') && string.endsWith(']');
    const isString = string.startsWith('"') && string.endsWith('"');
    try {
      if (isArray || isObject || isString) {
        return JSON.parse(string);
      }
      // We assume that it's a string
      return string;
    } catch (e) {
      console.error('JSONParser –– error', e);
      return string;
    }
  },
};

const LocalStorage = {
  keys: {},
  getItem: (name, defaultValue) => {
    if (typeof localStorage === 'undefined') return defaultValue;
    try {
      const data = localStorage.getItem(name);
      const result = JSONParser.parse(data) || defaultValue || data;
      return result;
    } catch (e) {
      console.error('Error while getting item from localStorage', e);
      return defaultValue;
    }
  },
  findItem: (predicate = () => false, defaultValue) => {
    if (typeof localStorage === 'undefined') return defaultValue;
    const keys = Object.keys(localStorage);
    const foundKey = _.find(keys, predicate);
    if (!foundKey) return defaultValue;
    return LocalStorage.getItem(foundKey, defaultValue);
  },
  removeItem: (key, options = {}) => {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(key);
      return;
    } catch (error) {
      console.error('LS#removeItem - error', { error });
    }
  },
  clear: () => {
    if (typeof localStorage === 'undefined') return;
    localStorage.clear();
  },
  setItem: (name, data) => {
    const strinfigied = JSON.stringify(data);
    return localStorage.setItem(name, strinfigied);
  },
};

window.LS = LocalStorage;

export default LocalStorage;
