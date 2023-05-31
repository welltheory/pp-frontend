import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Input as AntInput } from 'antd';
import styles from './styles.modules.scss';

const Input = (props) => {
  const {
    className,
    ...rest
  } = props;
  const classes = classNames(
    styles.input,
    className,
  );
  return (
    <div className={classes} data-cy="input">
      <AntInput {...rest} />
    </div>
  );
};

export default Input;
