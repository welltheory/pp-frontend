import _ from 'lodash';
import URL from '@utils/url';
import history from '@router/history';
import queryString from 'query-string';

const Redirects = {
  key: 'returnTo',
  preserve: ({ location, passNext }) => {
    const { pathname, search } = location;
    const params = queryString.parse(search);
    if (passNext && params[Redirects.key]) {
      return { [Redirects.key]: params[Redirects.key] };
    }
    const joined = [pathname, search].join('');
    const encoded = encodeURIComponent(joined);
    return { [Redirects.key]: encoded };
  },
  fromURL: (options = {}) => {
    const values = URL.getQuery();
    const url = values[Redirects.key];
    if (!url) return null;
    const decoded = decodeURIComponent(url);
    if (options.execute) {
      history.push(decoded, {
        params: p => _.omit(p, Redirects.key),
      });
    }
    return decoded;
  },
};

export default Redirects;
