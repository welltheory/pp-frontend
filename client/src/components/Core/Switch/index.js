import React from 'react';
import classNames from 'classnames';
import { Switch as AntSwitch } from 'antd';
import styles from './styles.modules.scss';

const Switch = (props) => {
  const { className, size, ...config } = props;
  const classes = classNames(
    styles.switch,
    styles[`switch--${size}`],
    className,
  );
  return (
    <div className={classes} data-cy="switch">
      <AntSwitch
        {...config}
      />
    </div>
  );
};

Switch.defaultProps = {
  size: 'default',
};

export default Switch;
