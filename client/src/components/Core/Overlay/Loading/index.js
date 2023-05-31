import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import Spinner from '@components/Core/Spinner';
import Scroll from '@utils/scroll';
import styles from './styles.modules.scss';

const Overlay = HOCs.compose(
  HOCs.lifecycle({
    componentDidMount() {
      Scroll.toggleBodyLock(true);
    },
    componentWillUnmount() {
      Scroll.toggleBodyLock(false);
    },
  }),
)((props) => {
  const { title, description } = props;
  return (
    <div className={styles.overlay}>
      <Spinner.Circle />
      {title && <h5>{title}</h5>}
      {description && <p>{description}</p>}
    </div>
  );
});

export default Overlay;
