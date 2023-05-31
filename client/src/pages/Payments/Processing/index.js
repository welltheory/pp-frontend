import React from 'react';
import * as HOCs from '@hocs';
import Section from '@components/Core/Section';
import Spinner from '@components/Core/Spinner';
import Row from '@components/Core/Row';
import Col from '@components/Core/Col';
import Card from '@components/Core/Card';
import Time from '@utils/time';
import history from '@router/history';
import styles from './styles.modules.scss';

const Processing = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withHandlers({
    redirect: ({ getQuery }) => async () => {
      const { returnTo } = getQuery();
      await Time.delay(3000);
      if (returnTo) return history.push(returnTo);
      return history.push('/profile');
    },
  }),
)((props) => {
  const { redirect } = props;
  React.useEffect(() => {
    redirect();
  }, []);
  return (
    <Section className={styles.page} fullScreen>
      <Row type="flex">
        <Col xl="8" lg="6" md="4" sm="2" xs="0" />
        <Col xl="8" lg="12" md="16" sm="20" xs="24">
          <Card>
            <Card.Content>
              <Spinner.Circle />
              <h3>Please wait...</h3>
              <p>We're processing your request...</p>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Section>
  );
});

export default Processing;
