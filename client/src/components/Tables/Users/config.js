import React from 'react';
import _ from 'lodash';
import {
  ViewLink,
  Actions,
} from '@components/Info/Admin/User';
import styles from './styles.modules.scss';

const getColumns = (props) => {
  const { filters } = props;
  return [
    {
      key: 'email',
      title: 'Email',
      render: r => <ViewLink record={r} />,
      width: '95%',
      ellipsis: true,
    },
    {
      key: 'actions',
      title: null,
      render: r => <Actions record={r} />,
      width: '5%',
    },
  ];
};

export default {
  get: props => ({
    dataSource: props.$users.list(),
    columns: getColumns(props),
    bordered: true,
    scroll: { y: '' },
  }),
};
