import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import history from '@router/history';
import store from '@setup/store';
import Root from './root';
import '../styles/globals.scss';
import '../styles/antd.scss';

const App = () => {
  return (
    <ReduxProvider store={store} key="redux-provider">
      <HistoryRouter history={history}>
        <Root />
      </HistoryRouter>
    </ReduxProvider>
  );
};

export default App;
