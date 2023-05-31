/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { Pagination, Input } from 'antd';
import Button from '@components/Core/Button';
import Table from '@components/Core/Table';
import DropdownMenu from '@components/Core/DropdownMenu';
import Fuse from 'fuse.js';
import * as HOCs from '@hocs';
import styles from './styles.modules.scss';

const showTotal = (total) => `Total ${total} ${total === 1 ? 'item' : 'items'}`;

const Search = (props) => {
  const {
    onSearch,
  } = props;
  if (!onSearch) return null;
  return (
    <div className={styles.search}>
      <Input.Search
        placeholder="Search (confirm with Enter)"
        {...props}
      />
    </div>
  );
};

const Actions = (props) => {
  const {
    actions,
  } = props;
  const mainAction = _.first(actions);
  const otherActions = _.tail(actions);
  return (
    <div className={styles.actions}>
      {mainAction && (
        <Button size="small" {...mainAction} />
      )}
      {otherActions.length > 0 && (
        <DropdownMenu
          items={otherActions}
        />
      )}
    </div>
  );
};

const InteractiveTable = HOCs.compose()((props) => {
  const {
    config,
    pagination,
    search,
    actions,
    className,
    hidePagination,
  } = props;
  const classes = classNames(
    styles.table,
    hidePagination && styles['table--hide-pagination'],
    className,
  );
  return (
    <div className={classes}>
      <div className={styles.header}>
        <Search {...search} />
        <Actions actions={actions} />
      </div>
      <div className={styles.body}>
        <Table {...config} />
      </div>
      <div className={styles.footer}>
        {pagination && (
          <div className={styles.pagination}>
            <Pagination
              showLessItems={false}
              showQuickJumper={false}
              showSizeChanger={false}
              showTotal={showTotal}
              size="small"
              {...pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
});

InteractiveTable.defaultProps = {
  actions: [],
};

InteractiveTable.propTypes = {
  config: PropTypes.object.isRequired,
  pagination: PropTypes.object,
  search: PropTypes.object,
  actions: PropTypes.array,
};


InteractiveTable.Static = HOCs.compose(
  HOCs.withState('state', 'setState', (props) => {
    const index = Fuse.createIndex([], []);
    const fuse = new Fuse([], { keys: [] }, index);
    return {
      fuse,
    };
  }),
  HOCs.withProps((props) => {
    const { namespace, getQuery } = props;
    const query = getQuery();
    const searchValue = decodeURIComponent(_.get(query, `${namespace}_search`, ''));
    return {
      ...props,
      searchValue,
    };
  }),
  HOCs.withHandlers({
    createIndex: (props) => () => {
      const {
        config: { dataSource },
        indexFields,
        setState,
      } = props;
      const index = Fuse.createIndex(indexFields, dataSource);
      const fuse = new Fuse(dataSource, {
        includeScore: true,
        shouldSort: true,
        isCaseSensitive: false,
        keys: indexFields,
        minMatchCharLength: 2,
        threshold: 0.3,
      }, index);
      setState(s => ({ ...s, fuse }));
    },
  }),
  HOCs.withHandlers({
    handleSearch: (props) => (value) => {
      const {
        namespace,
        setQuery,
      } = props;
      const searchValue = value ? encodeURIComponent(value) : undefined;
      setQuery(q => ({ ...q, [`${namespace}_search`]: searchValue }));
    },
    provideRecords: (props) => () => {
      const {
        config: { dataSource },
        searchValue,
        state: { fuse },
      } = props;
      if (!searchValue) return dataSource;
      const results = fuse.search(searchValue);
      const records = results.map(r => r.item);
      return records;
    },
  }),
  HOCs.withProps((props) => {
    const { provideRecords } = props;
    return { ...props, records: provideRecords() };
  }),
  HOCs.lifecycle({
    componentDidMount() {
      const { createIndex } = this.props;
      createIndex();
    },
  }),
)((props) => {
  const {
    config,
    actions,
    searchValue,
    className,
    records,
    handleSearch,
  } = props;
  const classes = classNames(
    styles.table,
    className,
  );
  return (
    <div className={classes}>
      <div className={styles.header}>
        <Search
          defaultValue={searchValue}
          onSearch={handleSearch}
        />
        <Actions actions={actions} />
      </div>
      <div className={styles.body}>
        <Table
          {...config}
          dataSource={records}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          {showTotal(records.length)}
        </div>
      </div>
    </div>
  );
});

InteractiveTable.Static.defaulProps = {
  namespace: 'table',
  actions: [],
  indexFields: [],
};

InteractiveTable.Static.propTypes = {
  actions: PropTypes.array,
  indexFields: PropTypes.array,
  config: PropTypes.shape({
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
  }).isRequired,
  namespace: PropTypes.string.isRequired,
};

export default InteractiveTable;
