import React from 'react';
import _ from 'lodash';
import { Modal as AntModal, Input } from 'antd';
import { compose, withState, withHandlers, lifecycle } from 'react-recompose';
import classNames from 'classnames';
import styles from './styles.modules.scss';

const TimeoutConfirmation = compose(
  withState('state', 'setState', {
    interval: null,
    counter: 0,
    executed: false,
    cancelled: false,
  }),
  withHandlers({
    intervalMethod: props => () => {
      const {
        setState,
        state: { counter },
        modal,
      } = props;
      const remaining = counter <= 0 ? 0 : _.round(counter, 1);
      modal.update({
        okText: `Cancel (${remaining}s remaining)`,
        cancelButtonProps: {
          style: { display: 'none' },
        },
      });
      setState(s => ({
        ...s,
        counter: s.counter - 1,
      }));
    },
    cancelCounter: props => () => {
      const {
        setState,
        state: { executed, interval },
      } = props;
      if (executed) return;
      clearInterval(interval);
      setState(s => ({
        ...s,
        counter: 0,
        interval: null,
        cancelled: true,
      }));
    },
    executeOnOk: props => async () => {
      const {
        onOk,
        setState,
        state: { interval },
        modal,
      } = props;
      if (!interval) return;
      onOk();
      clearInterval(interval);
      await setState(s => ({ ...s, interval: null, counter: 0, executed: true }));
      modal.destroy();
    },
  }),
  withHandlers({
    startTimeout: props => async () => {
      const {
        setState,
        intervalMethod,
        executeOnOk,
        cancelCounter,
        confirmProps: { delay },
        modal,
      } = props;
      // Update the button
      modal.update({
        okButtonProps: {
          onClick: cancelCounter,
        },
        cancelButtonProps: {
          style: { display: 'none' },
        },
      });
      // Start the interval
      const interval = setInterval(() => {
        intervalMethod();
      }, 1000);
      await setState(s => ({ ...s, interval, counter: delay / 1000 }));
      intervalMethod();
      // Clear the interval after time and execute
      setTimeout(() => {
        executeOnOk();
      }, delay + 1000);
      return false;
    },
  }),
  lifecycle({
    componentDidMount() {
      const { startTimeout, modal } = this.props;
      modal.update({
        destroyOnClose: true,
        okButtonProps: {
          onClick: startTimeout,
        },
      });
    },
    componentDidUpdate(prevProps) {
      const { state: { cancelled: prevCancelled } } = prevProps;
      const {
        state: { cancelled },
        modal,
        setState,
        startTimeout,
        okText = 'OK',
      } = this.props;
      if (!prevCancelled && cancelled) {
        setState(s => ({ ...s, cancelled: false }));
        modal.update({
          cancelButtonProps: {
            style: { display: 'block' },
          },
          okText,
          okButtonProps: {
            onClick: startTimeout,
          },
        });
      }
    },
    componentWillUnmount() {
      const { state: { interval } } = this.props;
      clearInterval(interval);
    },
  }),
)((props) => {
  const {
    content,
    modal,
    // State & handlers
    state,
  } = props;
  if (!modal) return null;
  const classes = classNames(
    styles['timeout-confirmation-modal'],
  );
  return (
    <div className={classes}>
      {content}
    </div>
  );
});

TimeoutConfirmation.defaultProps = {
  confirmProps: {
    delay: 5000,
  },
};

export default TimeoutConfirmation;
