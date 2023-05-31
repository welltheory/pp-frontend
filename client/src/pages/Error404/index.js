import React from 'react';
import _ from 'lodash';
import { Container, Section } from '@components/Core';
import styles from './styles.modules.scss';

const Error404 = () => {
  return (
    <div className={styles.page}>
      <Container fullOnMobile>
        <Section>
          <h1>404</h1>
        </Section>
      </Container>
    </div>
  );
};

export default Error404;
