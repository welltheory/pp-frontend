import React from 'react';
import classNames from 'classnames';
import Section from '@components/Core/Section';
import Row from '@components/Core/Row';
import Col from '@components/Core/Col';
import Card from '@components/Core/Card';
import styles from './styles.modules.scss';

/*
When mounted, the user:
- [ ] If possible – should be redirected to Stripe's Billing Customer Portal (API.users.payments.portal() method)
- [ ] If not possible – should be redirected back to the /profile page
*/

const Portal = (props) => {
  return (
    <Section className={styles.page} fullScreen>
      <Row type="flex">
        <Col xl="6" lg="5" md="4" sm="2" xs="0" />
        <Col xl="12" lg="14" md="16" sm="20" xs="24">
          <Card title="Portal" loading />
        </Col>
      </Row>
    </Section>
  );
};

export default Portal;
