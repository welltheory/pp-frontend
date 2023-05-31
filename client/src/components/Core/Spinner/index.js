import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Oval } from 'react-loader-spinner';
import styles from './styles.modules.scss';

const Spinner = () => (<div />);

Spinner.Circle = (props) => {
  const {
    className,
    fullScreen,
    size = 45,
  } = props;
  const classes = classNames(
    className,
    styles.circle,
    { [styles['circle--full-screen']]: fullScreen },
  );
  return (
    <div className={classes} data-cy="spinner-circle">
      <Oval
        width={size}
        height={size}
      />
    </div>
  );
};

export default Spinner;
