import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { compose } from 'react-recompose';

const HOC = (getDestination) => Component => compose()((props) => {
  const destination = getDestination(props);
  if (destination?.href) {
    useEffect(() => {
      window.location.href = destination.href;
    }, []);
    return null;
  }
  if (destination?.to) {
    return <Navigate to={destination.to} replace />;
  }
  return <Component {...props} />;
});

export default HOC;
