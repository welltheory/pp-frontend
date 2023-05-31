import React from 'react';
import _ from 'lodash';
import { Modal as AntModal, Input } from 'antd';
import { compose, withState, withHandlers, lifecycle } from 'react-recompose';
import classNames from 'classnames';
import styles from './styles.modules.scss';

const PromptConfirmation = compose(
  withState('state', 'setState', {
    value: '',
  }),
  withHandlers({
    onInputChange: props => (e) => {
      const { setState } = props;
      const { value } = e.target;
      setState(s => ({ ...s, value }));
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { state: { value: prevValue } } = prevProps;
      const {
        state: { value },
        confirmProps: { confirmationText },
        modal,
      } = this.props;
      if (value === confirmationText) {
        modal.update({ okButtonProps: { disabled: false } });
      }
      if (value !== confirmationText && prevValue === confirmationText) {
        modal.update({ okButtonProps: { disabled: true } });
      }
    },
  }),
)((props) => {
  const {
    content,
    confirmProps: { confirmationText },
    modal,
    // State & handlers
    state: { value },
    onInputChange,
  } = props;
  if (!modal) return null;
  const classes = classNames(
    styles['prompt-confirmation-modal'],
  );
  return (
    <div className={classes}>
      {content}
      <div className={styles.prompt}>
        <p>To continue please type in <code>{confirmationText}</code> in the input below:</p>
        <Input
          value={value}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
});

PromptConfirmation.defaultProps = {
  confirmProps: {
    confirmationText: 'delete',
  },
};

export default PromptConfirmation;
