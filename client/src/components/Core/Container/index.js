import React from 'react';
import classNames from 'classnames';
import styles from './styles.modules.scss';

const Container = ({ className, children, fullOnMobile, minWidth }) => {
  const classes = classNames(
    styles.container,
    { [styles['container--min-width']]: minWidth },
    { [styles['container--full-on-mobile']]: fullOnMobile },
    className,
  );
  return (
    <div className={classes} data-cy="container">
      {children}
    </div>
  );
};

export default Container;
