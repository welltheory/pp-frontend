import _ from 'lodash';
import queryString from 'query-string';
import history from '@router/history';

const URL = {
  getQuery: () => {
    return queryString.parse(history.location.search);
  },
};

export default URL;
