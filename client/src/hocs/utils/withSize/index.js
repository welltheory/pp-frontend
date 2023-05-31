import React from 'react';
import { withSize as sizeMe } from 'react-sizeme';

const thresholds = {
  xs: 576,
  sm: 767,
  md: 991,
  lg: 1999,
};

const getSizeId = (width) => {
  if (width <= thresholds.xs) return 'xs';
  if (width <= thresholds.sm) return 'sm';
  if (width <= thresholds.md) return 'md';
  if (width <= thresholds.lg) return 'lg';
  return 'xl';
};

const withSize = () => (Component) => sizeMe({
  resizeDetectorStrategy: 'scroll',
})((props) => {
  const { size: { width } } = props;
  const id = getSizeId(width);

  return (
    <Component
      {...props}
      size={{ width, id, thresholds }}
    />
  );
});

export default withSize;
