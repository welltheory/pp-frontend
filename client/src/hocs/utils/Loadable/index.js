import React from 'react';
import loadable from '@loadable/component';
import styles from './styles.modules.scss';


// NOTE: We can't load <Section /> because of circular dependencies
const Loader = () => (
  <div className={styles.section}>
    Loading...
  </div>
);

const Loadable = {
  Component: method => (options = {}) => {
    return loadable(method, options);
  },
  Route: method => (options = {}) => {
    return loadable(() => method(), {
      fallback: <Loader />,
      ...options,
    });
  },
};

export default Loadable;
