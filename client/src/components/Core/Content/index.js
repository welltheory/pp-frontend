import React from 'react';
import { Layout } from 'antd';
import styles from './styles.modules.scss';

const Content = (props) => {
  const { children } = props;
  return (
    <Layout.Content className={styles.content}>
      {children}
    </Layout.Content>
  );
};

export default Content;
