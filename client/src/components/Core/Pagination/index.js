import React from 'react';
import classNames from 'classnames';
import { compose, withHandlers } from 'react-recompose';
import { Pagination as AntPagination } from 'antd';
import styles from './styles.modules.scss';

const Pagination = compose(
  withHandlers({
    handleOnChange: props => (...params) => {
      const { onChange } = props;
      if (onChange) onChange(...params);
    },
  }),
)((props) => {
  const {
    className,
    handleOnChange,
    ...rest
  } = props;
  const classes = classNames(
    styles.pagination,
    className,
  );
  return (
    <div className={classes} data-cy="pagination">
      <AntPagination
        showSizeChanger={false}
        {...rest}
        onChange={handleOnChange}
      />
    </div>
  );
});

export default Pagination;
