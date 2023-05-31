import _ from 'lodash';
import * as HOCs from '@hocs';
import withQuery from '@hocs/utils/withQuery';


const HOC = (tableName) => {
  const Sorters = {
    getKey: (sorterKey) => [`t${tableName}sorter`, sorterKey].filter(Boolean).join('__'),
  };
  return HOCs.compose(
    HOCs.withHandlers({
      handleTableChange: props => (pagination, filters, sorter) => {
        const { getQuery, setQuery } = props;
        const query = getQuery();
        let nextQuery = { ...query };
        // Sorter
        nextQuery = _.mapValues(query, (value, key) => {
          if (key.startsWith(Sorters.getKey())) return undefined;
          return value;
        });
        if (sorter) nextQuery[Sorters.getKey(sorter.columnKey)] = sorter.order;

        setQuery(nextQuery);
      },
      getSorterValue: props => (sorterKey) => {
        const { getQuery } = props;
        const query = getQuery();
        return query[Sorters.getKey(sorterKey)];
      },
    }),
  );
};

export default HOC;
