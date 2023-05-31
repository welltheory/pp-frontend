import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import parsePhoneNumber from 'libphonenumber-js';
import { compose, withHandlers, withState, lifecycle } from 'react-recompose';
import { Input } from 'antd';
import MobilePrefix from './MobilePrefix';
import MobilePrefixData from './MobilePrefix/data';
import styles from './styles.modules.scss';

const Data = {
  parse: (value, defaultPrefixCountryCode = null) => {
    if (!value) return { prefixValue: null, mobileValue: null, formatted: '' };
    const parsed = parsePhoneNumber(value);
    if (!parsed) {
      const defaultPrefixValue = MobilePrefixData.findByCountryCode(defaultPrefixCountryCode) || null;
      console.log('DDD', defaultPrefixValue, defaultPrefixCountryCode);
      if (value.startsWith('+')) {
        return { prefixValue: defaultPrefixValue, mobileValue: null, formatted: value };
      }
      return { prefixValue: defaultPrefixValue, mobileValue: value, formatted: value };
    }
    const { countryCallingCode, nationalNumber } = parsed;
    const prefixValue = countryCallingCode ? `+${countryCallingCode}` : null;
    const formatted = `${prefixValue}${nationalNumber}`;
    return { prefixValue, mobileValue: nationalNumber, formatted };
  },
  format: ({ prefixValue, mobileValue }) => {
    return [prefixValue, mobileValue].filter(Boolean).join('');
  },
};

const PhoneNumber = compose(
  withState('state', 'setState', (props) => {
    const { value, defaultPrefixCountryCode } = props;
    const parsed = Data.parse(value, defaultPrefixCountryCode);
    return {
      ...parsed,
      focused: false,
    };
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
    handlePrefixChange: props => (prefixValue) => {
      const { setState } = props;
      setState(s => ({ ...s, prefixValue }));
    },
    handleMobileChange: props => ({ target: { value: mobileValue } }) => {
      const { setState } = props;
      setState(s => ({ ...s, mobileValue }));
    },
  }),
  lifecycle({
    // componentDidMount() {
    //   window.parsePhoneNumber = parsePhoneNumber;
    // },
    componentDidUpdate(prevProps) {
      const { value: prevValue, state: prevState } = prevProps;
      const {
        value,
        setState,
        state,
        onChange,
        defaultPrefixCountryCode,
      } = this.props;
      if (prevValue !== value && value !== state.formatted) {
        const parsed = Data.parse(value, defaultPrefixCountryCode);
        setState(s => ({ ...s, ...parsed }));
      }
      const shouldUpdateFormatted = (state.prefixValue !== prevState.prefixValue)
        || (state.mobileValue !== prevState.mobileValue);
      if (shouldUpdateFormatted) {
        const formatted = Data.format(state);
        setState(s => ({ ...s, formatted }));
      }
      const stateChanged = prevState.formatted !== state.formatted;
      if (stateChanged && onChange) {
        onChange(state.formatted);
      }
    },
  }),
)((props) => {
  const {
    placeholder,
    handleFocus,
    handleBlur,
    handleMobileChange,
    handlePrefixChange,
    state: {
      focused,
      prefixValue,
      mobileValue,
      formatted,
    },
  } = props;
  const classes = classNames(
    styles['phone-number'],
    focused && styles['phone-number--focused'],
  );
  return (
    <div className={classes}>
      <MobilePrefix
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handlePrefixChange}
        value={prefixValue}
      />
      <Input
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleMobileChange}
        value={mobileValue}
      />
    </div>
  );
});

export default PhoneNumber;
