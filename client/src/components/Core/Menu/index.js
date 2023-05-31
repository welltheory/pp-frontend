
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import * as HOCs from '@hocs';
import { Menu } from 'antd';
import Icon from '../Icon';
import Link from '../Link';
import Modal from '../Modal';
import Tooltip from '../Tooltip';
import styles from './styles.modules.scss';

const Item = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withHandlers({
    isActive: ({ location, item }) => () => {
      const isActive = location.pathname.endsWith(item.key);
      return isActive;
    },
  }),
)((props) => {
  const { isActive, item } = props;
  const {
    icon,
    link,
    type,
    title,
    tooltip,
    disabled,
  } = item;
  const active = isActive();
  const classes = classNames(
    styles.item,
    { [styles[`item--type-${type}`]]: type },
    { [styles['item--is-link']]: link },
    { [styles['item--disabled']]: disabled },
    { [styles['item--active']]: active },
  );
  return (
    <div className={classes}>
      <Tooltip {...tooltip}>
        <Link {...link}>
          {icon && (
            <div className={styles.icon}>
              <Icon {...icon} />
            </div>
          )}
          <span>{title}</span>
        </Link>
      </Tooltip>
    </div>
  );
});

const getItems = (props) => {
  const { items } = props;
  return items.map((item) => {
    return {
      key: item.key,
      label: <Item item={item} />,
      disabled: item.disabled,
    };
  });
};

const Component = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withHandlers({
    handleMenuClick: ({ config, onClick }) => (props) => {
      const { domEvent } = props;
      domEvent.stopPropagation();
      config.forEach((item) => {
        if (!item || !item.action) return;
        if (props.key !== item.key) return;
        if (item.disabled) return;
        if (item.confirm) {
          Modal.confirm({
            ...item.confirm,
            onOk: () => item.action(props),
          });
        } else {
          item.action(props);
        }
      });
      if (onClick) onClick(props);
    },
  }),
)((props) => {
  const {
    id,
    mode,
    handleMenuClick,
  } = props;
  const items = getItems(props);
  if (items.length === 0) return null;
  const classes = classNames(
    styles.menu,
    styles[`menu--${mode}`],
  );
  return (
    <Menu
      id={id}
      mode={mode}
      items={items}
      className={classes}
      onClick={handleMenuClick}
    />
  );
});

Component.defaultProps = {
  items: [],
};

export default Component;
