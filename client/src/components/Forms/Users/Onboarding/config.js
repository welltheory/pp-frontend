import React from 'react';
import _ from 'lodash';
import styles from './styles.modules.scss';

const getSections = (props) => {
  return [
    {
      spaced: false,
      fields: [
        {
          id: 'first_name',
          label: 'What is your first name?',
          component: 'input',
          span: { xl: 24, lg: 24, md: 24, sm: 24, xs: 24 },
          required: true,
          props: {
            placeholder: 'e.g. Jane',
          },
        },
        {
          id: 'last_name',
          label: 'What is your last name?',
          component: 'input',
          span: { xl: 24, lg: 24, md: 24, sm: 24, xs: 24 },
          required: true,
          props: {
            placeholder: 'e.g. Smith',
          },
        },
      ].filter(Boolean),
    },
  ];
};

const getAppearance = (props) => {
  const { form } = props;
  return {
    primary: {
      text: 'Save',
    },
  };
};

export default {
  get: (props) => ({
    form: props.form,
    size: props.size,
    onSubmit: props.submitForm,
    sections: getSections(props),
    appearance: getAppearance(props),
    className: styles.form,
  }),
};
