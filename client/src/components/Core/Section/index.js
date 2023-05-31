import React from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.modules.scss';

const Section = (props) => {
  const {
    className,
    id,
    children,
    fullScreen,
    padding,
    loading,
  } = props;
  const classes = classNames(
    styles.section,
    { [styles['section--full-screen']]: fullScreen },
    { [styles[`section--padding-${padding}`]]: padding },
    loading && styles['section--loading'],
    className,
  );
  if (loading) {
    return (
      <section className={classes} id={id} data-cy="section">
        <div className={styles.loader}>
          <Spinner.Circle />
        </div>
      </section>
    );
  }
  return (
    <section className={classes} id={id} data-cy="section">
      {children}
    </section>
  );
};

Section.defaultProps = {
  fullScreen: false,
  padding: 'regular',
};

export default Section;
