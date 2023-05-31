import React from 'react';
import _ from 'lodash';
import * as HOCs from '@hocs';
import Select from '@components/Core/Select';
import Data from './data';
import styles from './styles.modules.scss';

const MobilePrefix = HOCs.compose(
  HOCs.withHandlers({
    handleChange: props => (value) => {
      const { onChange } = props;
      onChange(value);
    },
  }),
)((props) => {
  const {
    value,
    handleChange,
    onFocus,
    onBlur,
  } = props;
  return (
    <div
      className={styles['mobile-prefix']}
      data-cy="mobile-prefix"
      onClick={(e) => {
        e.stopPropagation();
        return false;
      }}
    >
      <Select
        options={Data.selectOptions}
        onChange={handleChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        dropdownMatchSelectWidth={false}
        placeholder="+1"
        optionLabelProp="id"
        blank
      />
    </div>
  );
});

export default MobilePrefix;
