import React from 'react';
import _ from 'lodash';
import { Form, Input } from 'antd';
import { compose, withHandlers, withProps, lifecycle } from 'react-recompose';
import withOptions from '@hocs/utils/withOptions';
import withState from '../withState';
import Utils from './utils';

const {
  getForm,
} = Utils;

const defaultOptions = {
  propName: 'form',
  initialValues: {},
};

const withForm = (options) => Component => compose(
  withOptions({
    name: 'formOptions',
    options,
    defaults: defaultOptions,
  }),
  withProps((props) => {
    const { formOptions } = props;
    const { propName } = formOptions;
    const [form] = Form.useForm();
    return { ...props, [propName]: form };
  }),
  withState('formState', 'setFormState', {
    success: false,
    errors: [],
    loading: false,
  }),
)((props) => {
  const {
    setFormState,
    handleOnFieldsChange,
    handleOnValuesChange,
    formOptions: {
      name,
      initialValues,
    },
    ...rest
  } = props;
  const form = getForm(props);
  form.watchValue = key => Form.useWatch(key, form);
  window.form = form;
  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      form={form}
      name={name}
      scrollToFirstError
    >
      <Component {...rest} />
    </Form>
  );
});

export default withForm;
