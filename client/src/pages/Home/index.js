import React from 'react';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import * as HOCs from '@hocs';
import styles from './styles.modules.scss';

const Home = HOCs.compose(
  HOCs.withAuth(),
)((props) => {
  const { user } = props;
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return <Navigate to="/auth" replace />;
});

export default Home;
