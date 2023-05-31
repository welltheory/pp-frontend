import React, { useRef } from 'react';
import _ from 'lodash';

export default (options = {}) => Component => (props) => {
  const { key } = options;
  if (!key) throw Error('withRef – define the key!');
  if (key === 'ref') throw Error('withRef – key must be different than "ref"!');
  const ref = useRef(null);
  const params = { [key]: ref };
  return <Component {...props} {...params} />;
};
