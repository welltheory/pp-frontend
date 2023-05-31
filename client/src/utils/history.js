import _ from 'lodash';
import queryString from 'query-string';

const arrayFormat = 'comma';
const History = {
  parseString: (to) => {
    const { query: params, url: pathname } = queryString.parseUrl(to);
    return { pathname, params };
  },
  parse: (to, options) => {
    if (!to) return undefined;
    const { location } = window;
    const currentParams = queryString.parse(location.search);
    let result = to;
    if (_.isString(to)) result = History.parseString(to);
    if (!result.pathname) result.pathname = window.location.pathname;
    const { params, search } = result;
    const transform = v => ({
      ...v,
      search: [
        '?',
        queryString.stringify(v.search, { arrayFormat }),
      ].join(''),
    });
    const preserveSearch = options.preserveSearch || result.preserveSearch;
    if (preserveSearch) {
      result.search = { ...currentParams };
      return transform(result);
    }
    if (search) {
      result.search = queryString.parse(search, { arrayFormat });
    }
    if (_.isPlainObject(params)) {
      result.search = result.params;
    }
    if (_.isFunction(params)) {
      result.search = result.params(currentParams);
    }
    delete result.params;
    return transform(result);
  },
};



export default History;
