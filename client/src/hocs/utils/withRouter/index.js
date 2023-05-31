import React from 'react';
import _ from 'lodash';
import {
  useParams,
  useLocation,
} from 'react-router-dom';
import QS from 'query-string';
import history from '@router/history';

const getQuery = () => {
  const { search } = window.location;
  const query = QS.parse(search);
  return query;
};


const HOC = () => Component => props => {
  const location = useLocation();
  const params = useParams();
  const [state, setState] = React.useState({
    query: getQuery(),
    listener: null,
  });
  const setQuery = React.useCallback((v) => {
    const { search } = window.location;
    const query = QS.parse(search);
    const nextQuery = _.isFunction(v) ? v(query) : { ...query, ...v };
    history.push({ search: QS.stringify(nextQuery) });
  }, [state.query]);
  React.useEffect(() => {
    const listener = () => {
      setState(s => ({ ...s, query: getQuery() }));
    };
    window.addEventListener('history:update', listener);
    return () => {
      window.removeEventListener('history:update', listener);
    };
  }, []);
  return (
    <Component
      {...props}
      history={history}
      location={location}
      params={params}
      getQuery={getQuery}
      setQuery={setQuery}
      query={state.query}
    />
  );
};

export default HOC;
