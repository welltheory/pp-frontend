import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, withHandlers } from 'react-recompose';
import Scroll from '@utils/scroll';
import { Link } from 'react-router-dom';
import HistoryUtils from '@utils/history';
import styles from './styles.modules.scss';

const Helpers = {
  getHref: (props) => {
    const { href } = props;
    if (!href) return null;
    const isHTTP = href.match(/^https?:\/\//g);
    if (isHTTP) return href;
  },
  generateTo: (props) => {
    const { to, preserveSearch } = props;
    if (!to) return null;
    return HistoryUtils.parse(to, { preserveSearch });
  },
};

const LinkComponent = compose(
  withHandlers({
    handleClick: props => async (e) => {
      const { onClick, scrollTop } = props;
      if (onClick) onClick(e);
      if (scrollTop) Scroll.top(window, { top: -60, delay: 50 });
    },
  }),
)((props) => {
  const {
    size,
    type,
    color,
    children,
    className,
    handleClick,
    href,
    ...rest
  } = props;
  const params = _.omit(rest, [
    'scrollTop',
    'preserveSearch',
    'href',
  ]);
  const classes = classNames(
    styles.link,
    className,
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...params}
      >
        {children}
      </a>
    );
  }
  const to = Helpers.generateTo(props);
  if (!to) return children;
  return (
    <Link
      className={classes}
      {...params}
      to={to}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
});

LinkComponent.defaultProps = {
  scrollTop: true,
};

export default LinkComponent;
