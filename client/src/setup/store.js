import _ from 'lodash';
import setupStore from '@redux/setupStore';
import history from '@router/history';

const store = setupStore({ history });

export default store;
