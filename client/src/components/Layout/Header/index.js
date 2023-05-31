/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import * as HOCs from '@hocs';
import { Drawer } from 'antd';
import history from '@router/history';
import Button from '@components/Core/Button';
import Link from '@components/Core/Link';
import Icon from '@components/Core/Icon';
import styles from './styles.modules.scss';

const UserMenu = (props) => {
  const {
    onMenuClick,
  } = props;
  return (
    <div className={styles.menu} data-type="user" onClick={onMenuClick}>
      <Link to="/profile">
        Profile
      </Link>
    </div>
  );
};

const MobileMenu = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withAuth(),
  HOCs.withState('state', 'setState', {
    open: false,
  }),
  HOCs.withHandlers({
    toggle: props => (value) => {
      const {
        setState,
      } = props;
      setState((s) => ({
        ...s,
        open: _.isBoolean(value) ? value : !s.open,
      }));
    },
  }),
  HOCs.withHandlers({
    onMenuClick: props => () => {
      const { toggle } = props;
      toggle(false);
    },
  }),
)((props) => {
  const {
    toggle,
    state: { open },
  } = props;
  return (
    <div className={styles['mobile-menu']}>
      <div className={styles.trigger}>
        <Button type="link" onClick={toggle}>
          <Icon name="bars" />
        </Button>
      </div>
      <Drawer
        placement="bottom"
        rootClassName={styles['mobile-menu-drawer']}
        open={open}
        onClose={toggle}
        forceRender
        autoFocus
      >
        <UserMenu
          {...props}
        />
      </Drawer>
    </div>
  );
});

const DesktopMenu = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withAuth(),
)((props) => {
  const {
    location: { pathname },
  } = props;
  return (
    <div className={styles['desktop-menu']}>
      <UserMenu {...props} />
    </div>
  );
});

const Header = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withHandlers({
    handleLogoClick: props => () => {
      const {
        location: { pathname },
      } = props;
      if (pathname.includes('/schedule')) return;
      history.push('/');
    },
  }),
)((props) => {
  const {
    handleLogoClick,
  } = props;
  const classes = classNames(
    styles.header,
  );
  return (
    <div className={classes}>
      <nav>
        <div className={styles.box}>
          <DesktopMenu />
          <MobileMenu />
        </div>
      </nav>
    </div>
  );
});

export default Header;
