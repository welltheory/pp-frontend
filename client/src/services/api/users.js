import Fetch from '@services/utils/fetch';

const fetch = new Fetch({ path: '/users' });

export default {
  me: (params = {}) => fetch.get('/me', params),
  payments: {
    checkout: (params = {}) => fetch.post('/payments/checkout', params),
    portal: (params = {}) => fetch.post('/payments/portal', params),
  },
};
