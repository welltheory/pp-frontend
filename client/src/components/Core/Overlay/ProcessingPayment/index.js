import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import Spinner from '@components/Core/Spinner';
import Scroll from '@utils/scroll';
import styles from './styles.modules.scss';

const ProcessingPayment = HOCs.compose(
  HOCs.lifecycle({
    componentDidMount() {
      Scroll.toggleBodyLock(true);
    },
    componentWillUnmount() {
      Scroll.toggleBodyLock(false);
    },
  }),
)(() => {
  return (
    <div className={styles.overlay}>
      <Spinner.Circle />
      <h5>Processing</h5>
      <p>Give us a second or two...</p>
    </div>
  );
});

export default ProcessingPayment;
