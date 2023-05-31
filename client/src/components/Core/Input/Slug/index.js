import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import { Input } from 'antd';
import slugify from 'slugify';
import withDebounce from '@hocs/utils/withDebounce';

const createSlug = (v, options = {}) => slugify(v, {
  replacement: '-',
  strict: true,
  lower: true,
  trim: false,
  ...options,
});

const Component = HOCs.compose(
  HOCs.withHandlers({
    trim: ({ value, onChange }) => () => {
      const slug = createSlug(value, { trim: true });
      return onChange(slug);
    },
  }),
  withDebounce('trim', 800),
  HOCs.withHandlers({
    handleChange: ({ onChange, trim }) => (e) => {
      if (!onChange) return;
      const { value } = e.target;
      const slug = createSlug(value);
      setTimeout(trim, 10);
      return onChange(slug);
    },
  }),
  HOCs.lifecycle({
    componentDidUpdate(prevProps) {
      const { from: prevFrom } = prevProps;
      const { from, handleChange } = this.props;
      if (prevFrom && prevFrom !== from) {
        handleChange({ target: { value: from } });
      }
    },
  }),
)((props) => {
  const { handleChange } = props;
  return (
    <Input
      {...props}
      onChange={handleChange}
    />
  );
});

export default Component;
