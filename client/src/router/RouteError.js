import React from 'react';
import _ from 'lodash';
import Config from '@config';
import styles from './styles.modules.scss';

const RouteError = (props) => {
  const { state } = props;
  const msg = _.get(state, 'error.message');
  const stack = _.get(state, 'extra.componentStack');
  const errorString = `${msg}\n\n${stack}`;
  return (
    <div className={styles['route-error']}>
      <span>Error</span>
      {Config.isDevelopment() && msg && (
        <div>{errorString}</div>
      )}
    </div>
  );
};

export default RouteError;
