import React from 'react';
import _ from 'lodash';
import { compose, withHandlers } from 'react-recompose';
import { Navigate } from 'react-router-dom';
import withError from '@hocs/utils/withError';
import withAuth from '@hocs/withAuth';
import withRouter from '@hocs/utils/withRouter';
import Redirects from '@utils/redirects';
import RouteError from './RouteError';

const Route = compose(
  withRouter(),
  withError({ custom: true }),
  withAuth(),
  withHandlers({
    calculateRedirect: props => (pathname) => {
      const {
        location,
      } = props;
      const { returnTo } = Redirects.preserve({ location, passNext: true });
      const result = { pathname };
      if (returnTo) result.search = `?returnTo=${returnTo}`;
      return result;
    },
  }),
)((props) => {
  const {
    user,
    restricted,
    errorState,
    children,
    calculateRedirect,
  } = props;
  if (restricted && !user) {
    const to = calculateRedirect('/auth');
    return <Navigate to={to} />;
  }
  if (errorState.error) {
    return <RouteError state={errorState} />;
  }
  return children;
});

export default Route;
