import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, withState, withHandlers } from 'react-recompose';
import Icon from '../Icon';
import styles from './styles.modules.scss';

const getDefaultValue = (props) => {
  const { defaultValue, value } = props;
  if (!_.isNil(value)) return value;
  if (!_.isNil(defaultValue)) return defaultValue;
  return false;
};

const Checkbox = compose(
  withState('state', 'setState', (props) => {
    const value = getDefaultValue(props);
    return { value };
  }),
  withHandlers({
    getValue: props => () => {
      const { state, value } = props;
      if (!_.isNil(value)) return value;
      return state.value;
    },
  }),
  withHandlers({
    handleChange: props => () => {
      const { onChange, setState, getValue } = props;
      const nextValue = !getValue();
      if (onChange) onChange(nextValue);
      setState(s => ({ ...s, value: nextValue }));
    },
  }),
)((props) => {
  const {
    className,
    handleChange,
    getValue,
    size,
    type,
  } = props;
  const classes = classNames(
    styles.checkbox,
    styles[`checkbox--${size}`],
    styles[`checkbox--${type}`],
    className,
  );
  const value = getValue();
  return (
    <div
      className={classes}
      data-cy="checkbox"
      data-value={value}
      onClick={handleChange}
    >
      {value && <Icon name="circle-check" />}
      {!value && <Icon name="circle" />}
    </div>
  );
});

Checkbox.defaultProps = {
  size: 'default',
  type: 'primary',
};

export default Checkbox;
