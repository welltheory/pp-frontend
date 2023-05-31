import React from 'react';
import { useSelector } from 'react-redux';

// Mocked HOC providing user object
const HOC = () => Component => props => {
  const { auth } = useSelector(state => state);
  const { user } = auth;
  return (
    <Component
      {...props}
      user={user}
    />
  );
};

export default HOC;
