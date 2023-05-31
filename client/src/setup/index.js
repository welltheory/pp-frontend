import _ from 'lodash';
import Dayjs from './dayjs';
import Icons from './icons';

const Setup = {
  construct: () => {
    return new Promise((resolve) => {
      if (window.__setup) return resolve();
      Dayjs.setup();
      Icons.setup();
      window.__setup = true;
      return resolve();
    });
  },
};

export default Setup;
