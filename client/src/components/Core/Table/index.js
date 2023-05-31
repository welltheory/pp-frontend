import React from 'react';
import classNames from 'classnames';
import { Table as AntTable } from 'antd';
import Spinner from '../Spinner';
import styles from './styles.modules.scss';

const defaultLocale = {
  emptyText: 'No data',
};

const Table = (props) => {
  const {
    className,
    total,
    loading,
    ...config
  } = props;
  const classes = classNames(
    styles.table,
    className,
  );
  return (
    <div className={classes}>
      {loading && (
        <div className={styles.loader}>
          <Spinner.Circle size={32} />
        </div>
      )}
      <AntTable
        pagination={false}
        {...config}
        locale={defaultLocale}
      />
      <div className={styles.footer}>
        {!!total && <div className={styles.total}>{total} total</div>}
      </div>
    </div>
  );
};

Table.defaultProps = {
  rowKey: r => r.id,
};

export default Table;
