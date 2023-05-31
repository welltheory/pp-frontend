import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import {
  Col,
  DatePicker,
  Input,
  InputNumber,
  Form,
  Checkbox,
  Switch,
  Rate,
} from 'antd';
import Slug from '@components/Core/Input/Slug';
import Select from '@components/Core/Select';
import TextArea from '@components/Core/TextArea';
import Note from '@components/Core/Note';
import PhoneNumber from '@components/Core/Input/PhoneNumber';
import FormUtils from '@components/Core/Form/utils';
import Utils from '../utils';
import styles from './styles.modules.scss';

const CONSTANTS = {
  dateFormat: 'LL',
  locale: 'en-us',
};

const getDefaultProps = ({ field, size }) => {
  const defaults = {
    size: size || 'default',
    disabled: field.disabled || false,
  };
  defaults.placeholder = (() => {
    const included = _.includes(['datePicker', 'cleaveDate'], field.component);
    if (included) {
      return field.placeholder || CONSTANTS.dateFormat;
    }
    return _.get(field, 'props.placeholder') || field.placeholder || field.label;
  })();
  return defaults;
};

const getFieldComponent = (params) => {
  const { field } = params;
  const {
    content,
    component,
    props = {},
  } = field;
  if (content) return content;
  const defaults = getDefaultProps(params);
  switch (component) {
    case 'placeholder': {
      return <div />;
    }
    case 'note': {
      return <Note {...props} />;
    }
    case 'input': {
      return (
        <Input
          {...defaults}
          {...props}
        />
      );
    }
    case 'slug': {
      return (
        <Slug
          {...defaults}
          {...props}
        />
      );
    }
    case 'inputNumber': {
      return (
        <InputNumber
          {...defaults}
          {...props}
        />
      );
    }
    case 'textarea': {
      return (
        <TextArea
          rows={4}
          {...defaults}
          {...props}
        />
      );
    }
    case 'datePicker': {
      return (
        <DatePicker
          format={CONSTANTS.dateFormat}
          inputReadOnly
          showNow={false}
          showToday={false}
          {...defaults}
          {...props}
        />
      );
    }
    case 'rangePicker': {
      return (
        <DatePicker.RangePicker
          format={CONSTANTS.dateFormat}
          {...defaults}
          {...props}
        />
      );
    }
    case 'select': {
      return (
        <Select
          {...defaults}
          {...props}
        />
      );
    }
    case 'switch': {
      return (
        <Switch {...defaults} {...props}>
          {field.label}
        </Switch>
      );
    }
    case 'checkbox': {
      return (
        <Checkbox
          {...defaults}
          {...props}
        >
          {_.isString(field.label) && (
            <div dangerouslySetInnerHTML={{ __html: field.label }} />
          )}
          {!_.isString(field.label) && field.label}
          {field.required && <mark>*</mark>}
        </Checkbox>
      );
    }
    case 'phoneNumber': {
      return (
        <PhoneNumber
          {...defaults}
          {...props}
        />
      );
    }
    default:
      return null;
  }
};

const getFormItemParams = (props) => {
  const { field } = props;
  if (field.content) {
    const params = { key: 'field.id' };
    if (field.label) params.label = Utils.getLabel(props);
    return params;
  }
  if (field.component === 'note') return { key: 'field.id' };
  if (field.component === 'testMode') return { key: 'field.id' };
  const params = {
    key: field.id,
    name: field.id,
    help: Utils.getHelp(props),
    // extra: Utils.getExtra(props),
    dependencies: field.dependencies,
    rules: [
      Utils.getRequiredRule(props),
      Utils.getMinRule(props),
      Utils.getTypeRule(props),
      Utils.getValidatorRule(props),
      ...Utils.getCustomRules(props),
    ].filter(Boolean),
    validateTrigger: Utils.getValidateTriggerRule(props),
    normalize: Utils.getNormalizeMethod(props),
    valuePropName: Utils.getValuePropName(props),
    getValueFromEvent: Utils.getGetValueFromEventcolumn(props),
    hasFeedback: Utils.getHasFeedback(props),
    shouldUpdate: true,
    label: Utils.getLabel(props),
    validateStatus: Utils.getValidateStatus(props),
  };
  return params;
};

// - decoratorOnly –– to render just the formDecorator
const Field = (props) => {
  const { field } = props;
  if (!field) return null; // Skip fields if they are false, null, undefined etc. – no need to filter them in configs
  const component = getFieldComponent(props);
  if (!component) return null;
  const classes = classNames(
    styles.field,
    { [styles['field--hidden']]: field.hidden },
    { [styles['field--with-help']]: !!field.help },
    { [styles['field--loading']]: field.loading },
  );
  const spans = FormUtils.getSpans(field.span, 'field');
  const formItemParams = getFormItemParams(props);
  return (
    <Col
      {...spans}
      className={classes}
      data-cy="form-field"
      data-form-id={field.id}
      data-form-component={field.component}
    >
      <Form.Item {...formItemParams}>
        {component}
      </Form.Item>
    </Col>
  );
};

export default Field;
