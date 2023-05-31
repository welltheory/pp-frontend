import React from 'react';
import _ from 'lodash';
import { compose, withProps, withHandlers } from 'react-recompose';
import QS from 'query-string';
import history from '@router/history';

const Utils = {
  transform: (value, config) => {
    if (!config) return value;
    if (_.isUndefined(value)) return config.defaultValue;
    if (config.type === 'boolean') return value === 'true';
    if (config.type === 'number') return parseInt(value, 10) || config.defaultValue;
    if (config.type === 'array:string') return value.split(',');
    if (config.type === 'array:number') return value.split(',').map(r => parseInt(r, 10));
    return value;
  },
  getQuery: (prevQuery, configs) => {
    const values = QS.parse(window.location.search);
    const query = { ...prevQuery };
    // Scan all the values in the query string
    Object.keys(values).forEach((key) => {
      query[key] = Utils.transform(values[key], configs[key]);
    });
    // Scan all the config values to make sure we have all possible default values
    Object.keys(configs).forEach((key) => {
      const config = configs[key];
      if (_.isUndefined(query[key])) {
        query[key] = config.defaultValue;
      }
    });
    return query;
  },
  modifyQuery: (query, v) => {
    if (_.isFunction(v)) return v(query);
    if (_.isPlainObject(v)) return { ...query, ...v };
    return query;
  },
};

const withQuery = (configs = {}) => compose(
  withProps(props => {
    const query = Utils.getQuery(props.query, configs);
    return { ...props, query };
  }),
  withHandlers({
    setQuery: props => (v) => {
      const { query } = props;
      const params = Utils.modifyQuery(query, v);
      history.push({ params });
    },
  }),
);

export default withQuery;
