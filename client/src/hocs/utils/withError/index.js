import React from 'react';
import _ from 'lodash';
import { compose, withState, lifecycle } from 'react-recompose';
import styles from './styles.modules.scss';

export default (options = {}) => Component => compose(
  withState('errorState', 'setErrorState', {
    error: null,
    extra: null,
  }),
  lifecycle({
    componentDidCatch(error, extra) {
      const { setErrorState } = this.props;
      setErrorState(s => ({ ...s, error, extra }));
    },
  }),
)((props) => {
  const { errorState } = props;
  const { error } = errorState;
  if (!error) return <Component {...props} />;
  if (options.custom) return <Component {...props} errorState={errorState} />;
  if (options.skip) return null;
  return (
    <div className={styles.error}>
      <h6>Error</h6>
      <p>We're already working on it!</p>
    </div>
  );
});
