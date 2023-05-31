import React from 'react';
import classNames from 'classnames';
import Button from '@components/Core/Button';
import styles from './styles.modules.scss';

const getStatus = (currentPage, i) => {
  if (currentPage < i) return 'empty';
  if (currentPage === i) return 'active';
  return 'filled';
};

const Pagination = (props) => {
  const {
    state: { currentPage },
    withPagination,
    pages,
  } = props;
  if (!withPagination) return null;
  return (
    <div className={styles.pagination} data-cy="form-pagination">
      {pages.map((page, i) => {
        const status = getStatus(currentPage, i);
        const classes = classNames(
          styles.page,
          [styles[`page--${status}`]],
        );
        return (
          <Button
            key={i}
            data-cy="form-pagination__indicator"
            className={classes}
            type="blank"
          >
            {/* */}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
