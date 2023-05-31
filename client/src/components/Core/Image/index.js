import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import { compose, withHandlers, withState } from '@hocs';
import styles from './styles.modules.scss';

const Image = compose(
  withState('loaded', 'setLoaded', false),
  withHandlers({
    onLoad: ({ setLoaded }) => () => setLoaded(true),
  }),
)((props) => {
  const {
    name,
    src,
    className,
    style,
    loaded,
    fitHeight,
    fitWidth,
    onLoad,
    lazy,
    alt,
  } = props;
  if (!name && !src) return null;
  const classes = classNames(
    styles.image,
    className,
    { [styles['image--loaded']]: loaded },
    { [styles['image--fit-width']]: fitWidth },
    { [styles['image--fit-height']]: fitHeight },
  );
  if (!lazy) {
    return (
      <div className={classes} style={style} data-cy="image">
        <img
          onLoad={onLoad}
          src={src}
          alt={alt}
        />
      </div>
    );
  }
  return (
    <div className={classes} style={style} data-cy="image">
      <LazyLoad once offset={200}>
        <img
          onLoad={onLoad}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </div>
  );
});

Image.defaultProps = {
  fitWidth: false,
  lazy: true,
  fitHeight: false,
};

export default Image;
