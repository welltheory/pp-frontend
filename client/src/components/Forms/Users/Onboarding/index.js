import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import * as HOCs from '@hocs';
import Time from '@utils/time';
import Col from '@components/Core/Col';
import message from '@components/Core/message';
import Form from '@components/Core/Form';
import Wrapper from '@components/Forms/Wrapper';
import API from '@services/api';
import Config from './config';

const Component = HOCs.compose(
  HOCs.withRouter(),
  HOCs.withAuth(),
  HOCs.withState('internalFormState', 'setInternalFormState', {
    ready: false,
  }),
  HOCs.withForm(),
  HOCs.withHandlers({
    submitForm: props => async () => {
      const {
        form,
        onSuccess,
      } = props;
      try {
        const values = await form.validateFields();
        const { data } = await API.users.me.onboard({
          data: values,
        });
        if (onSuccess) await onSuccess({ form, values, data });
      } catch (error) {
        message.responseError(error);
      }
    },
    handleInitialMount: props => async () => {
      const {
        setInternalFormState,
        auth: { user },
        form,
      } = props;
      try {
        form.setFieldsValue({
          first_name: user.first_name,
          last_name: user.last_name,
          mobile: user.mobile || '',
        });
        setInternalFormState(s => ({ ...s, ready: true }));
      } catch (error) {
        setInternalFormState(s => ({ ...s, ready: true, error }));
      }
    },
  }),
)((props) => {
  const {
    handleInitialMount,
    internalFormState: { ready, error },
  } = props;
  const config = Config.get(props);

  React.useEffect(() => {
    handleInitialMount();
  }, []);

  return (
    <Wrapper
      ready={ready}
      error={error}
    >
      <Col xl="24" lg="24" md="24" sm="24" xs="24">
        <Form {...config} />
      </Col>
    </Wrapper>
  );
});

export default Component;
