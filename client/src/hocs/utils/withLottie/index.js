import React from 'react';

const withLottie = (key) => (Component) => (props) => {
  const ref = React.useRef(null);
  const params = {
    [key]: ref,
  };
  // console.log('Lottie:', params, animationData);
  return (
    <Component
      {...props}
      {...params}
    />
  );
};

export default withLottie;
