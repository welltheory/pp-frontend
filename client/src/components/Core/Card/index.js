/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, withState, withHandlers } from 'react-recompose';
import LS from '@utils/localStorage';
import Spinner from '../Spinner';
import Button from '../Button';
import Icon from '../Icon';
import styles from './styles.modules.scss';

const Header = ({ className, title, side }) => {
  const classes = classNames(
    styles.card__header,
    className,
  );
  return (
    <div className={classes} data-cy="card-header">
      {title && <h5>{title}</h5>}
      {side && <div className={styles.card__header__side}>{side}</div>}
    </div>
  );
};

const Card = (props) => {
  const {
    className,
    style,
    children,
    title,
    comment,
    loading,
    padding,
    id,
  } = props;
  const classes = classNames(
    styles.card,
    [styles[`card--padding-${padding}`]],
    { [styles['card--is-loading']]: loading },
    className,
  );
  const content = loading
    ? (
      <div className={styles.loader}>
        <Spinner.Circle
          fullScreen
          className={styles.spinner}
        />
        <p>Please wait...</p>
      </div>
    )
    : children;
  return (
    <div className={classes} id={id} style={style} data-cy="card">
      {title && <Header title={title} comment={comment} />}
      {content}
    </div>
  );
};

Card.defaultProps = {
  padding: 'default', // none, default
  style: {},
  className: undefined,
  children: undefined,
  title: undefined,
  comment: undefined,
  loading: false,
  id: undefined,
};

Card.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
  comment: PropTypes.string,
  loading: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'default']),
  id: PropTypes.string,
};

Card.Header = Header;

Card.Content = ({ className, children }) => {
  const classes = classNames(
    styles.card__content,
    className,
  );
  return (
    <div className={classes} data-cy="card-content">
      {children}
    </div>
  );
};

Card.Footer = ({ className, children }) => {
  const classes = classNames(
    styles.card__footer,
    className,
  );
  return (
    <div className={classes} data-cy="card-footer">
      {children}
    </div>
  );
};

export default Card;
