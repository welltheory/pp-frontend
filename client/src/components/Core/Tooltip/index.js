import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import styles from './styles.modules.scss';

const TooltipComponent = (props) => {
  const {
    children,
    className,
    noWrapper,
    overlayStyle,
    title,
    ...rest
  } = props;
  const classes = classNames(
    styles.tooltip,
    'tooltip-wrapper',
    className,
  );
  const style = {
    maxWidth: 300,
    ...overlayStyle,
  };
  if (!title) {
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
  const HTMLTitle = _.isString(title)
    ? <div dangerouslySetInnerHTML={{ __html: title }} />
    : title;
  return (
    <Tooltip overlayStyle={style} title={HTMLTitle} placement={rest.placement}>
      <div className={classes}>
        {children}
      </div>
    </Tooltip>
  );
};

TooltipComponent.defaultProps = {
  overlayStyle: {},
};

export default TooltipComponent;
