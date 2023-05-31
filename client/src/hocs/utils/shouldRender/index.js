import React from 'react';
import { compose } from 'react-recompose';

const HOC = checker => Component => compose()((props) => {
  if (!checker(props)) return null;
  return <Component {...props} />;
});

export default HOC;
