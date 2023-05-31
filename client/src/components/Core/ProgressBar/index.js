import React from 'react';
import classNames from 'classnames';
import { Progress } from 'antd';
import styles from './styles.modules.scss';

const ProgressBar = (props) => {
  const {
    className,
    prefix,
    current = 0,
    max = 1,
    renderInfo,
    decimals,
    size,
  } = props;
  const classes = classNames(
    styles['progress-bar'],
    styles[`progress-bar--${size}`],
    className,
  );
  const percent = ((current / max) * 100).toFixed(decimals);
  const status = percent >= 100 ? 'success' : 'active';
  return (
    <div className={classes} data-cy="progress-bar">
      {prefix && <p data-cy="prefix">{prefix}</p>}
      <Progress
        percent={percent}
        status={status}
        showInfo={!renderInfo}
      />
      {renderInfo && <p data-cy="suffix">{renderInfo(current, max)}</p>}
    </div>
  );
};

ProgressBar.defaultProps = {
  size: 'default',
  renderInfo: null,
  decimals: 2,
};

export default ProgressBar;
