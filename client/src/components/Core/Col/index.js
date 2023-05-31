import React from 'react';
import _ from 'lodash';
import { Col as AntCol } from 'antd';


const Col = (props) => {
  const picked = _.pick(props, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
  const sizes = _.mapValues(picked, v => parseInt(v, 10));
  return <AntCol data-cy="col" {...props} {...sizes} />;
};

export default Col;
