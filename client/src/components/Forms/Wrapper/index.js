import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, lifecycle, withState } from 'react-recompose';
import { Row } from '@components/Core';
import Spinner from '@components/Core/Spinner';
import Time from '@utils/time';
import styles from './styles.modules.scss';

const Wrapper = compose(
  withState('wrapperState', 'setWrapperState', {
    revealed: false,
  }),
  lifecycle({
    async componentDidUpdate() {
      const {
        loading,
        ready,
        setWrapperState,
        wrapperState: { revealed },
      } = this.props;
      const shouldReveal = !revealed && (!loading && ready);
      if (shouldReveal) {
        await Time.delay(10);
        setWrapperState(s => ({ ...s, revealed: true }));
      }
    },
  }),
)((props) => {
  const {
    loading,
    className,
    children,
    ready,
    error,
    wrapperState: { revealed },
  } = props;
  const wrapperClasses = classNames(
    styles.wrapper,
    { [styles['wrapper--loading']]: loading },
    { [styles['wrapper--ready']]: ready },
    { [styles['wrapper--not-ready']]: !ready },
    { [styles['wrapper--children-hidden']]: loading || !ready },
  );
  const classes = classNames(
    styles.form,
    { [styles['form--hidden']]: loading || !ready },
    { [styles['form--revealed']]: revealed },
    className,
  );
  if (error) {
    return (
      <div className={wrapperClasses}>
        {error.message}
      </div>
    );
  }
  const showSpinner = (!ready && !loading)
    || loading;
  return (
    <div className={wrapperClasses}>
      {showSpinner && (
        <div className={styles.loader}>
          <Spinner.Circle fullScreen />
        </div>
      )}
      <Row type="flex" className={classes} data-cy="children">
        {children}
      </Row>
    </div>
  );
});

Wrapper.defaultProps = {
  loading: false,
  ready: true, // If false, the loading indicator is on top of the form, but the form is already rendered (so we can use its fields)
  error: null,
};

export default Wrapper;
