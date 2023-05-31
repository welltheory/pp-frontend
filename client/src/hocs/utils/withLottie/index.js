import React from 'react';
import { useLottie } from 'lottie-react';

const withLottie = (key) => (Component) => (props) => {
  const ref = React.useRef(null);
  // const lottie = useLottie({
  //   ...config,
  //   animationData,
  //   onDestroy: () => {
  //     console.log('Lottie destroyed.');
  //   },
  //   onConfigReady: () => {
  //     console.log('Lottie config ready.');
  //   },
  //   onDataFailed: () => {
  //     console.log('Lottie data failed.');
  //   },
  //   onDataReady: () => {
  //     console.log('Lottie data ready.');
  //   },
  //   onComplete: () => {
  //     console.log('Lottie complete.');
  //   },
  // });
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
