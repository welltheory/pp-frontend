import _ from 'lodash';
import { createBrowserHistory } from 'history';
import HistoryUtils from '@utils/history';

// Setting up history:
const history = createBrowserHistory();
const cache = {
  push: history.push,
};

// Push with intl handling
history.push = (to, options = {}) => {
  const obj = HistoryUtils.parse(to, options);
  return cache.push(obj);
};

history.listen((update) => {
  window.dispatchEvent(new Event('history:update'));
  return update;
});

window.h = history;

export default history;
