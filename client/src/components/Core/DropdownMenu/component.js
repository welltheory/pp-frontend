import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose, withHandlers } from 'react-recompose';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import history from '@router/history';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';
import styles from './styles.modules.scss';

const DropdownMenu = compose(
  withHandlers({
    handleButtonClick: ({ onClick }) => (e) => {
      e.stopPropagation();
      if (onClick) onClick(e);
      return false;
    },
    handleMenuClick: props => ({ item }) => {
      const {
        action,
        link,
        className,
        confirmation,
      } = item.props;
      const isDanger = className.includes('danger');
      if (action) {
        if (confirmation) {
          Modal.confirm({
            title: confirmation.title || 'Are you sure?',
            content: confirmation.content || 'This action cannot be undone.',
            onOk: action,
            okType: 'danger',
          });
        } else {
          action();
        }
      }
      if (link) {
        if (link.to) return history.push(link.to);
        if (link.href) return window.open(link.href);
      }
    },
  }),
)((props) => {
  const {
    disabled,
    icon,
    className,
    overlayClassName,
    handleMenuClick,
    link,
    size,
    children,
    items,
  } = props;
  const isDisabled = disabled || _.isEmpty(items);
  const classes = classNames(
    className,
    styles['dropdown-menu'],
    { [styles['dropdown-menu--disabled']]: isDisabled },
  );
  const overlayClasses = classNames(
    styles['dropdown-overlay'],
    styles[`dropdown-overlay--${size}`],
    overlayClassName,
  );
  return (
    <Dropdown
      disabled={isDisabled}
      menu={{ items, onClick: handleMenuClick }}
      overlayClassName={overlayClasses}
      trigger={['click', 'hover']}
      className={classes}
    >
      <div>
        {children || (
          <Button
            type="link"
            fill="none"
            size={size}
            // onClick={handleButtonClick}
            link={link}
          >
            <Icon {...icon} />
          </Button>
        )}
      </div>
    </Dropdown>
  );
});

DropdownMenu.defaultProps = {
  items: [],
  size: 'medium',
  icon: { name: 'ellipsis-v', weight: 'regular' },
};

DropdownMenu.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    link: PropTypes.string,
    href: PropTypes.string,
  })),
  icon: PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.string,
  }),
  link: PropTypes.shape({
    to: PropTypes.string,
  }),
};

export default DropdownMenu;
