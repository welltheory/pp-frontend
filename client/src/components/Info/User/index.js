import React from 'react';
import _ from 'lodash';
import Link from '@components/Core/Link';
import Copy from '@components/Core/Copy';
import DropdownMenu from '@components/Core/DropdownMenu';
import PropertyList from '@components/Core/PropertyList';
import styles from './styles.modules.scss';

export const ViewLink = ({ record }) => {
  const { email } = record;
  return <Link to={record.path()}>{email}</Link>;
};

export const Actions = ({ record }) => {
  const items = [].filter(Boolean);
  return (
    <div className={styles.actions}>
      <DropdownMenu
        items={items}
      />
    </div>
  );
};

export const Header = ({ record }) => {
  const data = record.get();
  return (
    <div className={styles.header}>
      <Actions record={data} />
    </div>
  );
};

export const Properties = ({ record }) => {
  const data = record.get();
  return (
    <PropertyList
      config={[
        {
          properties: [
            {
              title: 'ID',
              value: data.id,
            },
            {
              title: 'Email',
              value: data.email,
            },
            {
              title: 'Auth ID',
              value: data.auth_id,
            },
            {
              title: 'Current plan',
              value: '', // TODO: add current plan
            },
          ],
        },
      ]}
    />
  );
};
