import React from 'react';
import classNames from 'classnames';
import { Tabs as AntTabs } from 'antd';
import styles from './styles.modules.scss';

const Tabs = (props) => {
  const {
    className,
    ...config
  } = props;
  const classes = classNames(
    styles.tabs,
    className,
  );
  return (
    <div className={classes} data-cy="tabs">
      <AntTabs {...config} />
    </div>
  );
};

Tabs.defaultProps = {
  type: 'line',
  items: [],
};

export default Tabs;
