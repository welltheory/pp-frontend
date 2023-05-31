import React from 'react';
import classNames from 'classnames';
import API from '@services/api';
import Section from '@components/Core/Section';
import Row from '@components/Core/Row';
import Col from '@components/Core/Col';
import Card from '@components/Core/Card';
import styles from './styles.modules.scss';

/*
TODO:
When mounted, the user
- [ ] should be redirected to Stripe's Checkout page (API.users.payments.checkout() method)
- [ ] Price ID should be grabbed from the query string.
- [ ] If not possible – should be redirected back to the /profile page
*/

const Checkout = (props) => {
  return (
    <Section className={styles.page} fullScreen>
      <Row type="flex">
        <Col xl="6" lg="5" md="4" sm="2" xs="0" />
        <Col xl="12" lg="14" md="16" sm="20" xs="24">
          <Card title="Checkout" loading />
        </Col>
      </Row>
    </Section>
  );
};

export default Checkout;
