import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, withHandlers, withState, lifecycle } from 'react-recompose';
import PhoneInput from 'react-phone-input-2';
import Select from '@components/Core/Select';
import 'react-phone-input-2/lib/style.css';
import styles from './styles.modules.scss';

const PhoneNumber = compose(
  withState('state', 'setState', {
    observer: null,
    key: `phone-number-${_.uniqueId()}`,
  }),
  withHandlers({
    handleFocus: props => () => {
      const { setState, onFocus } = props;
      setState(s => ({ ...s, focused: true }));
      if (onFocus) onFocus();
    },
    handleBlur: props => () => {
      const { setState, onBlur } = props;
      setState(s => ({ ...s, focused: false }));
      if (onBlur) onBlur();
    },
    handleChange: props => (value) => {
      const { setState, onChange } = props;
      if (onChange) onChange(value);
    },
  }),
)((props) => {
  const {
    placeholder,
    value,
    handleChange,
    disabled,
    state: { key },
  } = props;
  const classes = classNames(
    styles['phone-number'],
  );
  return (
    <div className={classes} data-key={key}>
      <PhoneInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        country="us"
        preferredCountries={['us', 'ca']}
        disabled={disabled}
        countryCodeEditable={false}
        autoFormat
      />
    </div>
  );
});

export default PhoneNumber;
