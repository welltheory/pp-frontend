import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import InteractiveTable from '@components/Tables/Interactive';
import Config from './config';
import styles from './styles.modules.scss';

const Component = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withModals(),
  HOCs.withHandlers({}),
)((props) => {
  const {
    $users,
  } = props;
  const config = Config.get(props);
  return (
    <div className={styles.table} data-cy="table">
      <InteractiveTable
        pagination={$users.pagination}
        search={$users.search}
        config={config}
        actions={[]}
      />
    </div>
  );
});

Component.defaultProps = {};

export default Component;
