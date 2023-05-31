import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { icon as faIcon } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import styles from './styles.modules.scss';

const Icon = (props) => {
  const {
    size,
    style,
    className,
    name,
    onClick,
  } = props;
  const classes = classNames(
    className,
    styles.icon,
    styles[`icon--${size}`],
    `${styles.icon}--${size}`,
  );
  const icon = `fa-${style} fa-${name}`;
  // if (!name) return null;
  // const icon = faIcon({
  //   name,
  // });
  return (
    <div
      className={classes}
      data-cy="icon"
      data-cy-icon={icon}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
      />
    </div>
  );
};

Icon.defaultProps = {
  style: 'regular',
  onClick: undefined,
};

Icon.propTypes = {
  style: PropTypes.oneOf(['light', 'regular', 'solid', 'duotone', 'brand']),
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;
