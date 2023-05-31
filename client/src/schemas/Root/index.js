import _ from 'lodash';
import dayjs from 'dayjs';

class RootSchema {
  constructor(r) {
    Object.assign(this, r);
    this.__constructed_at = Date.now();
  }

  displayDate = (path, options = {}) => {
    const value = _.get(this, path);
    if (!value) return '–';
    return dayjs(value).format(options.format || 'll');
  };

  displayDatetime = (path, options = {}) => {
    const value = _.get(this, path);
    if (!value) return '–';
    return dayjs(value).format('lll');
  };
}

export default RootSchema;
