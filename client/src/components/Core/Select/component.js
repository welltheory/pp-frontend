import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { compose, withHandlers } from 'react-recompose';
import { Select, Space } from 'antd';
import styles from './styles.modules.scss';

const PickedItems = () => {
  return (
    <div className={styles['picked-items']} id="picked-items" />
  );
};

const getCustomProps = (props) => {
  const { value, pickerMode, id } = props;
  if (pickerMode) {
    return {
      mode: 'tags',
      dropdownMatchSelectWidth: false,
      animation: 'off',
      notFoundContent: 'Not items picked',
      open: true,
      // filterOption: false,
      filterSort: (a, b) => {
        const aIndex = (value || []).findIndex((v) => v === a.value);
        const bIndex = (value || []).findIndex((v) => v === b.value);
        if (aIndex > bIndex) return -1;
        if (aIndex < bIndex) return 1;
        return 0;
      },
      getPopupContainer: () => {
        const container = document.querySelector(`[data-select-id="${id}"] #picked-items`);
        return container;
      },
      dropdownRender: (originNode) => {
        return (
          <div className={styles['picked-dropdown']}>
            {originNode}
          </div>
        );
      },
    };
  }
  return {};
};

const SelectComponent = compose(
  withHandlers({}),
)((props) => {
  const {
    disabled,
    options,
    onChange,
    onSearch,
    defaultValue,
    value,
    size,
    showSearch,
    loading,
    mode,
    dropdownMatchSelectWidth,
    placeholder,
    pickerMode,
    allowClear,
    id,
    render,
  } = props;
  const classes = classNames(
    styles.select,
    pickerMode && styles['select--picker-mode'],
  );
  const customProps = getCustomProps(props);
  return (
    <div className={classes} data-select-id={id}>
      <Select
        size={size}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        virtual={false}
        // options={options}
        onSearch={onSearch}
        showSearch={showSearch}
        loading={loading}
        mode={mode}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        placeholder={placeholder}
        allowClear={allowClear}
        optionFilterProp="filter"
        {...customProps}
      >
        {options.map((option) => {
          return (
            <Select.Option
              key={option.id}
              value={option.id}
              label={option.name}
              filter={[option.name, option.id].join(' ')}
            >
              {render ? render(option) : option.name}
            </Select.Option>
          );
        })}
      </Select>
      {pickerMode && <PickedItems {...props} />}
    </div>
  );
});

SelectComponent.defaultProps = {
  showSearch: true,
  options: [],
  dropdownMatchSelectWidth: false,
  pickerMode: false,
};

export default SelectComponent;
