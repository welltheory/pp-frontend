import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Oval } from 'react-loader-spinner';
import { useLottie } from 'lottie-react';
import bloomLottie from './lotties/bloom.json';
import styles from './styles.modules.scss';

const Spinner = () => (<div />);

Spinner.Circle = (props) => {
  const {
    className,
    fullScreen,
    size = 45,
  } = props;
  const classes = classNames(
    className,
    styles.circle,
    { [styles['circle--full-screen']]: fullScreen },
  );
  return (
    <div className={classes} data-cy="spinner-circle">
      <Oval
        width={size}
        height={size}
      />
    </div>
  );
};

Spinner.Bloom = (props) => {
  const {
    className,
    fullScreen,
    size = 144,
  } = props;
  const classes = classNames(
    className,
    styles.bloom,
    { [styles['bloom--full-screen']]: fullScreen },
  );
  const [direction, setDirection] = React.useState(1);
  const { View, ...lottie } = useLottie({
    animationData: bloomLottie,
    loop: false,
    onComplete: () => {
      setDirection(direction === 1 ? -1 : 1);
    },
  });
  useEffect(() => {
    lottie.setDirection(direction);
    lottie.setSpeed(2);
    lottie.play();
  }, [direction]);

  return (
    <div
      className={classes}
      style={{ width: size, height: size }}
      data-cy="spinner-bloom"
    >
      <div className={styles.lottie}>
        {View}
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
