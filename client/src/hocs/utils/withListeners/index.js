import React from 'react';
import { compose, lifecycle } from 'react-recompose';
import Events from '@utils/events';

const HOC = id => compose(
  lifecycle({
    componentDidMount() {
      const { props } = this;
      Events.addListener(id, (data) => {
        const { action, payload } = data;
        const method = props[action];
        if (!method) return;
        method(payload);
      });
    },
    componentWillUnmount() {
      Events.removeListener(id);
    },
  }),
);

export default HOC;
