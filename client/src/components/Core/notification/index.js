import _ from 'lodash';
import { notification } from 'antd';
import classNames from 'classnames';
import styles from './styles.modules.scss';

const Notification = ({
  type,
  ...rest
}) => {
  return notification[type]({
    placement: 'bottomRight',
    className: classNames(
      styles['notification'],
      { [styles[`notification--${type}`]]: type },
    ),
    ...rest,
  });
};

export default Notification;
