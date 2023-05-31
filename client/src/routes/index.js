import React from 'react';
import { useRoutes } from 'react-router-dom';
import RouteWrapper from '@router/Route';
import Home from '../pages/Home';
import Payments from '../pages/Payments';
import Profile from '../pages/Profile';
import Error404 from '../pages/Error404';

const routes = [
  { path: '/profile/*', component: Profile, restricted: true },
  { path: '/payments/*', component: Payments, restricted: true },
  { path: '/', component: Home, restricted: false },
  { path: undefined, component: Error404 },
].filter(Boolean);

const Component = () => {
  return useRoutes(routes.map((route) => {
    const {
      path,
      restricted,
      component: RouteComponent,
    } = route;
    const element = (
      <RouteWrapper restricted={restricted}>
        <RouteComponent />
      </RouteWrapper>
    );
    return { path, element };
  }));
};

export default Component;
