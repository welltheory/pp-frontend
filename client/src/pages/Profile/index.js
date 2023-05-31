import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import Row from '@components/Core/Row';
import Col from '@components/Core/Col';
import Section from '@components/Core/Section';
import Card from '@components/Core/Card';
import Button from '@components/Core/Button';
import PropertyList from '@components/Core/PropertyList';
import styles from './styles.modules.scss';

/*
TODO:
- [ ] Add padding to the .checkout and center the button
- [ ] Add conditional logic to the button
  - [ ] "Subscribe for $99/month" -> redirects to /payments/checkout
  - [ ] "Manage subscription" -> redirects to /payments/portal
*/

const Profile = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withAuth(),
  HOCs.withHandlers({
    onButtonClick: props => () => {
      // TODO:
    },
  }),
)((props) => {
  const {
    user,
    onButtonClick,
  } = props;
  const isSubscribed = false; // TODO:
  return (
    <Section className={styles.page} fullScreen>
      <Row type="flex">
        <Col xl="7" lg="5" md="4" sm="2" xs="0" />
        <Col xl="10" lg="14" md="16" sm="20" xs="24">
          <Card title="Profile" padding="none">
            <Card.Content>
              <PropertyList
                config={[{
                  properties: [
                    {
                      title: 'Email',
                      value: user.email,
                    },
                  ],
                }]}
              />
              <div className={styles.checkout}>
                <Button>
                  TODO:
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Section>
  );
});

export default Profile;
