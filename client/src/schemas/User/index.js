import _ from 'lodash';
import Root from '../Root';

class User extends Root {
  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

export default User;
