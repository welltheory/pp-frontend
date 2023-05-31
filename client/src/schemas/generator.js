import _ from 'lodash';
import User from './User';

class Generator {
  wrapUser = (data) => {
    if (!data) return null;
    const base = new User(data);
    return base;
  };
}

const generator = new Generator();

export default generator;
