import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Button from '../../Button';
import Icon from '../../Icon';
import Tooltip from '../../Tooltip';
import styles from './styles.modules.scss';

const getValidatorRule = ({ field }) => ({
  validator: (rule, value, callback) => {
    let message;
    const noValueCondition = field.disabled
      && field.required
      && !value;
    if (noValueCondition) {
      message = 'No value';
    }
    return callback(message);
  },
});

const getNormalizeMethod = ({ field }) => (value) => {
  // `selectType` is our own option, so we can easily manipulate booleans/ string booleans
  if (field.selectType === 'boolean') {
    if (_.isUndefined(value)) return value;
    const normalized = _.isString(value) ? value : `${!!value}`;
    return normalized;
  }
  if (field.component === 'upload') {
    if (_.isArray(value)) return value;
    const isURL = _.isString(value) && value.match(/^http/);
    if (isURL) return [{ uid: `${Math.random() * 1000}`, url: value }];
    return [];
  }
  if (_.isNull(value)) return undefined;
  return value;
};

const getTypeRule = ({ field }) => {
  const { type } = field;
  if (!type) return null;
  if (type === 'email') {
    return {
      type,
      message: 'Has to be an email',
    };
  }
  return {
    type,
    message: `Has to be a ${type}`,
  };
};

const getCustomRules = ({ field }) => {
  if (_.isArray(field.rules)) return field.rules;
  return [];
};

const getValuePropName = ({ field }) => {
  const { component } = field;
  switch (component) {
    case 'checkbox':
    case 'switch':
      return 'checked';
    case 'upload':
      return 'fileList';
    default:
      return 'value';
  }
};

const getGetValueFromEventcolumn = ({ field }) => {
  const { component } = field;
  if (component === 'cleaveNumeral') {
    return (e) => {
      if (!e || !e.target) return undefined;
      return parseFloat(e.target.rawValue) || undefined;
    };
  }
  return undefined;
};

const getValidateTriggerRule = (props) => {
  const { field } = props;
  const { validateTrigger } = field;
  return validateTrigger || 'onChange';
};

const getMinRule = (props) => {
  const { field } = props;
  const { min } = field;
  if (!min) return null;
  return {
    min,
    message: ['Minimum:', min].join(' '),
  };
};

const getHasFeedback = ({ field }) => {
  if (field.loading) return true;
  if (_.isUndefined(field.hasFeedback)) return !!field.validator;
  return field.hasFeedback;
};

const getValidateStatus = ({ field }) => {
  if (field.loading) return 'validating';
  return field.validationStatus;
};

const getTooltip = (props) => {
  const { field: { tooltip } } = props;
  if (!tooltip) return null;
  const config = {
    placement: 'right',
    ...tooltip,
  };
  const icon = tooltip.icon || { icon: 'question-circle' };
  return (
    <Tooltip {...config}>
      <Icon {...icon} />
    </Tooltip>
  );
};

const getAction = (props) => {
  const { field: { action } } = props;
  if (!action) return null;
  const { text, ...config } = action;
  return (
    <Button
      type="dark"
      fill="none"
      {...config}
    >
      {text}
    </Button>
  );
};


const getLabel = (props) => {
  const { field } = props;
  const { component, label } = field;
  const tooltip = getTooltip(props);
  const action = getAction(props);
  const placeholder = <div className={styles['label-placeholder']} />;
  if (component === 'checkbox') {
    return placeholder;
  }
  if (tooltip) {
    return (
      <React.Fragment>
        {label}
        {tooltip}
        {action}
      </React.Fragment>
    );
  }
  if (_.isNull(label)) return null;
  if (!label) return placeholder;
  return (
    <React.Fragment>
      {label}
      {action}
    </React.Fragment>
  );
};

const getRequiredRule = (props) => {
  const { field } = props;
  return {
    required: !!field.required,
    message: field.requiredMessage || 'Required',
  };
};

const getHelp = (props) => {
  const { field } = props;
  const { help, disabled } = field;
  if (!help) return null;
  if (disabled) return null;
  return help;
};

const Utils = {
  getHelp,
  getRequiredRule,
  getValidatorRule,
  getNormalizeMethod,
  getTypeRule,
  getCustomRules,
  getValuePropName,
  getGetValueFromEventcolumn,
  getValidateTriggerRule,
  getMinRule,
  getValidateStatus,
  getHasFeedback,
  getTooltip,
  getLabel,
};

export default Utils;
