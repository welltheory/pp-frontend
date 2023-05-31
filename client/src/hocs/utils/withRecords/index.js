import _ from 'lodash';
import { compose, withState, withHandlers, lifecycle, mapProps } from 'react-recompose';
import withRouter from '@hocs/utils/withRouter';
import withOptions from '@hocs/utils/withOptions';
import withQuery from '@hocs/utils/withQuery';
import withAuth from '@hocs/withAuth';
import message from '@components/Core/message';
import Events from '@utils/events';

const Query = {
  normalizeAccessor: (accessor) => accessor.replace('$', ''),
  getKey: (accessor, key) => `${Query.normalizeAccessor(accessor)}_${key}`,
  decodeKey: (accessor, key) => key.replace(`${Query.normalizeAccessor(accessor)}_`, ''),
};

const HOC = (accessor, options) => compose(
  withRouter(),
  withAuth(),
  withOptions({
    name: '$recordsOptions',
    options,
    defaults: {
      method: () => {},
      key: 'id',
      handlers: {},
      wrap: data => data,
      batch: null,
      onSuccess: null,
      autoFetch: true,
    },
  }),
  withState('recordsState', 'setRecordsState', {
    timestamp: 0,
    loading: true,
    errors: null,
    selectedRowKeys: [],
    data: {},
    order: [],
    page: 1,
    pageSize: 10,
    total: 0,
  }),
  withHandlers({
    getRecordsQuery: props => () => {
      const { getQuery } = props;
      const query = getQuery();
      const normalizedAccessor = Query.normalizeAccessor(accessor);
      const keys = Object.keys(query)
        .filter(key => key.startsWith(normalizedAccessor));
      const recordsQuery = keys.reduce((acc, key) => {
        const value = query[key];
        const nextKey = Query.decodeKey(accessor, key);
        return { ...acc, [nextKey]: value };
      }, {});
      return recordsQuery;
    },
  }),
  withHandlers({
    fetchRecords: props => async () => {
      const {
        setRecordsState,
        recordsState: { timestamp },
        $recordsOptions: {
          key,
          method,
          onSuccess,
          wrap,
        },
      } = props;
      try {
        if (!method) throw new Error('No method provided to fetch records');
        setRecordsState(s => ({
          ...s,
          loading: !timestamp,
          error: null,
        }));
        const { data } = await method(props);
        const nextState = { loading: false, timestamp: Date.now() };
        if (data.docs) {
          // Handle paginated results
          const { docs, page, limit, total } = data;
          const wrapped = docs.map(wrap);
          nextState.page = page;
          nextState.pageSize = limit;
          nextState.total = total;
          nextState.order = wrapped.map(doc => _.get(doc, key));
          nextState.data = _.keyBy(wrapped, key);
        } else {
          const wrapped = data.map(wrap);
          nextState.page = 1;
          nextState.pageSize = wrapped.length;
          nextState.total = wrapped.length;
          nextState.order = wrapped.map(doc => _.get(doc, key));
          nextState.data = _.keyBy(wrapped, key);
        }
        if (onSuccess) await onSuccess(data, nextState);
        await setRecordsState(s => ({ ...s, ...nextState }));
      } catch (error) {
        message.responseError(error);
        setRecordsState(s => ({ ...s, loading: false, error }));
      }
    },
    changeRecordsPage: props => (value, config = {}) => {
      const {
        recordsState: {
          page,
          total,
          pageSize,
        },
        setQuery,
      } = props;
      const key = Query.getKey(accessor, 'page');
      const maxPage = Math.ceil(total / pageSize);
      const nextPage = Math.min(Math.max(config.relative ? (page + value) : value, 1), maxPage);
      setQuery(q => ({ ...q, [key]: nextPage }));
    },
    changeRecordsPageSize: props => (v, value) => {
      const { setQuery } = props;
      const key = Query.getKey(accessor, 'limit');
      setQuery(q => ({ ...q, [key]: value }));
    },
    handleRecordsPaginationChange: props => (page, pageSize) => {
      const { setQuery } = props;
      const pageKey = Query.getKey(accessor, 'page');
      const limitKey = Query.getKey(accessor, 'limit');
      setQuery(q => ({ ...q, [pageKey]: page, [limitKey]: pageSize }));
    },
    handleTableChange: props => (pagination, filters, sorter) => {
      //
    },
    handleTableRowSelection: props => (selectedRowKeys) => {
      const { setRecordsState } = props;
      setRecordsState(s => ({ ...s, selectedRowKeys }));
    },
    // Batch action handler
    performBatch: props => async (action) => {
      const {
        recordsState: { selectedRowKeys, data },
        setRecordsState,
        $recordsOptions: {
          batch,
        },
      } = props;
      if (!batch) throw new Error('No batch method provided');
      try {
        setRecordsState(s => ({ ...s, batching: true }));
        const { data: { message: msg } } = await batch(action, selectedRowKeys);
        if (msg) message.warn(msg);
        await setRecordsState(s => ({ ...s, batching: false }));
      } catch (error) {
        message.responseError(error);
        setRecordsState(s => ({ ...s, batching: false }));
      }
    },
    searchRecords: props => (value) => {
      const { setQuery } = props;
      const key = Query.getKey(accessor, 'search');
      if (!value) {
        setQuery(q => ({ ...q, [key]: undefined }));
        return;
      }
      const encoded = encodeURIComponent(value);
      setQuery(q => ({ ...q, [key]: encoded }));
    },
    filterRecords: props => (method) => {
      const { getQuery, setQuery } = props;
      const query = getQuery();
      const key = Query.getKey(accessor, 'filters');
      const currentFilters = query[key] || {};
      if (Object.keys(currentFilters).length === 0) {
        setQuery(q => ({ ...q, [key]: undefined }));
        return;
      }
      const nextFilters = method(currentFilters);
      const encoded = encodeURIComponent(JSON.stringify(nextFilters));
      setQuery(q => ({ ...q, [key]: encoded }));
    },
    listRecords: props => () => {
      const {
        recordsState: { order, data },
      } = props;
      const records = order.map((key) => data[key]);
      return records;
    },
    getSearchValue: props => () => {
      const { getQuery } = props;
      const query = getQuery();
      const key = Query.getKey(accessor, 'search');
      const value = query[key] || '';
      const decoded = decodeURIComponent(value);
      return decoded;
    },
    getFilters: props => () => {
      const { getQuery } = props;
      const query = getQuery();
      const key = Query.getKey(accessor, 'filters');
      const encoded = query[key];
      if (!encoded) return {};
      try {
        const filters = JSON.parse(decodeURIComponent(encoded));
        return filters;
      } catch (error) {
        return {};
      }
    },
    getRecord: props => (key) => {
      const {
        recordsState: { data },
      } = props;
      return data[key];
    },
  }),
  withHandlers(({ $recordsOptions: { handlers } }) => {
    return { ...handlers };
  }),
  mapProps((props) => {
    const { $recordsOptions: { handlers } } = props;
    const handlersKeys = Object.keys(handlers);
    const toSkip = [
      '$recordsOptions',
      'recordsState',
      'setRecordsState',
      'fetchRecords',
      'changeRecordsPage',
      'performBatch',
      'handleRecordsPaginationChange',
      'listRecords',
      'getRecord',
      'searchRecords',
      'filterRecords',
      'getSearchValue',
      'getFilters',
      'handleTableChange',
      'handleTableRowSelection',
      ...handlersKeys,
    ];
    const passedProps = _.omit(props, toSkip);
    const controller = {
      list: props.listRecords,
      get: props.getRecord,
      fetch: props.fetchRecords,
      options: props.$recordsOptions,
      changePage: props.changeRecordsPage,
      state: props.recordsState,
      filter: props.filterRecords,
      getSearchValue: props.getSearchValue,
      getFilters: props.getFilters,
      searchRecords: props.searchRecords,
      performBatch: props.performBatch,
      search: {
        defaultValue: props.getSearchValue(),
        onSearch: props.searchRecords,
      },
      table: {
        onChange: props.handleTableChange,
        rowSelection: {
          onChange: props.handleTableRowSelection,
          selectedRowKeys: props.recordsState.selectedRowKeys,
        },
      },
      pagination: {
        current: props.recordsState.page,
        pageSize: props.recordsState.pageSize,
        total: props.recordsState.total,
        onChange: props.handleRecordsPaginationChange,
      },
      ..._.pick(props, handlersKeys),
    };
    return {
      ...passedProps,
      [accessor]: controller,
    };
  }),
  lifecycle({
    componentDidMount() {
      const { props } = this;
      const $controller = props[accessor];
      const { options, fetch } = $controller; // eslint-disable-line
      if (options.autoFetch) fetch();
      Events.addListener(accessor, (data) => {
        const { action, payload } = data;
        console.log('Received event', action, payload);
        const method = _.get($controller, action);
        if (method) return method(payload);
      });
    },
    componentDidUpdate(prevProps) {
      const prevController = prevProps[accessor];
      const { query: prevQuery } = prevProps;
      const controller = this.props[accessor];
      const { query } = this.props;

      const pageKey = Query.getKey(accessor, 'page');
      const prevPage = prevQuery[pageKey];
      const page = query[pageKey];

      const limitKey = Query.getKey(accessor, 'limit');
      const prevLimit = prevQuery[limitKey];
      const limit = query[limitKey];

      const prevKey = prevController.options.key;
      const { key } = controller.options;

      const searchKey = Query.getKey(accessor, 'search');
      const prevSearch = prevQuery[searchKey];
      const search = query[searchKey];

      const shouldRefetch = prevPage !== page
        || prevLimit !== limit
        || prevKey !== key
        || prevSearch !== search;
      if (shouldRefetch) controller.fetch();
    },
    componentWillUnmount() {
      Events.removeListener(accessor);
    },
  }),
);

export default HOC;
