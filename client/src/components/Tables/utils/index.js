import _ from 'lodash';
import dayjs from 'dayjs';

export const sorters = {
  string: path => (a, b) => {
    const stringA = _.get(a, path)?.toLowerCase();
    const stringB = _.get(b, path)?.toLowerCase();
    if (stringA < stringB) return -1;
    if (stringA > stringB) return 1;
    return 0;
  },
  number: path => (a, b) => {
    const numberA = parseFloat(_.get(a, path, 0));
    const numberB = parseFloat(_.get(b, path, 0));
    if (numberA < numberB) return -1;
    if (numberA > numberB) return 1;
    return 0;
  },
  date: path => (a, b) => {
    const dateA = dayjs(_.get(a, path)).unix() || -1;
    const dateB = dayjs(_.get(b, path)).unix() || -1;
    return dateA - dateB;
  },
};

