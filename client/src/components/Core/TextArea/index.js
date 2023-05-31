import React from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import styles from './styles.modules.scss';

const Counter = (props) => {
  const { value, min, max } = props;
  if (typeof max === 'number') {
    const current = value || '';
    return (
      <div className={styles.counter}>
        {current.length}/{max}
      </div>
    );
  }
  if (typeof min === 'number') {
    const current = value || '';
    if (current.length >= min) return null;
    if (current.length === 0) return null;
    return (
      <div className={styles.counter} data-status="warning">
        {(current.length - min) * -1} remaining
      </div>
    );
  }
  return null;
};

const TextArea = (props) => {
  const { className, ...config } = props;
  const classes = classNames(
    styles.textarea,
    className,
  );
  return (
    <div className={classes}>
      <Input.TextArea {...config} maxLength={config.max} />
      <Counter {...props} />
    </div>
  );
};

TextArea.defaultProps = {};

export default TextArea;
