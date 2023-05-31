import '../styles/globals.scss';
import React, { useCallback } from 'react';
import _ from 'lodash';
import enUS from 'antd/es/locale/en_US';
import { Layout, ConfigProvider } from 'antd';
import Content from '@components/Core/Content';
import Header from '@components/Layout/Header';
import Routes from '@routes';

// https://ant.design/docs/react/customize-theme
const App = () => {
  return (
    <ConfigProvider
      locale={enUS}
      renderEmpty={() => 'No records'}
      theme={{
        token: {
          borderRadius: '60px',
          controlHeight: 40,
          colorPrimary: '#2f494e',
          colorLink: '#9f503c',
          colorLinkActive: '#AD6E5E',
          colorLinkHover: '#AD6E5E',
          colorError: '#9f503c',
          colorErrorOutline: '#d2afa6',
        },
      }}
    >
      <Layout className="layout">
        <Header />
        <Content>
          <Routes />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
