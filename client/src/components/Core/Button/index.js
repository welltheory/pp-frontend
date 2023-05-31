import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { Button } from 'antd';
import Tooltip from '../Tooltip';
import Icon from '../Icon';
import Link from '../Link';
import styles from './styles.modules.scss';

// NOTE: Sizes to be introduced later (possibly)

const types = [
  'primary',
  'secondary',
  'caution',
  'warning',
  'success',
  'dark',
  'black',
  'blank',
  'white',
  'link',
];

const ButtonComponent = ({
  size,
  type,
  fill,
  className,
  link,
  children,
  style,
  tooltip,
  text,
  label,
  cy,
  onClick,
  disabled,
  loading,
  center,
  rounded,
  hidden,
  htmlType,
  content,
  padded,
}) => {
  const isRegularType = types.includes(type);
  const classes = classNames(
    className,
    styles.button,
    styles[`button--${size}`],
    styles[`button--fill-${fill}`],
    styles[`button--${type}`],
    { [styles['button--no-padding']]: !padded },
    { [styles['button--rounded']]: rounded },
    { [styles['button--disabled']]: !!disabled },
    { [styles['button--is-link']]: link.href || link.to },
    { [styles['button--center']]: center },
    { [styles['button--hidden']]: hidden },
  );
  return (
    <Button
      className={classes}
      style={style}
      data-cy={cy}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      htmlType={htmlType}
    >
      <Tooltip
        placement="left"
        mouseLeaveDelay={0.025}
        {...tooltip}
      >
        <Link {...link}>
          {children || content || text || label}
        </Link>
      </Tooltip>
    </Button>
  );
};

ButtonComponent.defaultProps = {
  style: {},
  type: 'primary',
  fill: 'full',
  size: 'default',
  htmlType: 'button',
  rounded: true,
  hidden: false,
  disabled: false,
  padded: true,
  link: {},
  tooltip: {},
  text: undefined,
  label: undefined,
  content: undefined,
};

ButtonComponent.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.oneOf(types),
  fill: PropTypes.oneOf(['full', 'outline', 'underscore', 'none']),
  size: PropTypes.oneOf(['tiny', 'small', 'default', 'medium', 'large', 'xl']),
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  padded: PropTypes.bool,
  link: PropTypes.shape({
    href: PropTypes.string,
    to: PropTypes.string,
  }),
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.string,
  }),
  text: PropTypes.string,
  label: PropTypes.string,
  content: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
};

export default ButtonComponent;
