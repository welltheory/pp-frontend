import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import Icon from '../Icon';
import styles from './styles.modules.scss';

// const example = [
//   {
//     title: 'Account details',
//     properties: [
//       { title: 'Name', value: 'Jimi Brook' },
//       { title: 'Email', value: 'm.b@gmail.com' },
//     ],
//     width: '50%',
//   },
//   {
//     title: 'billing details',
//     properties: [
//       { title: 'Address', value: 'Wojskowa 10' },
//       { title: 'City', value: 'Poznan' },
//       { title: 'Phone', value: '500 672 944' },
//     ],
//     width: '50%',
//   },
// ];

const Value = (props) => {
  const {
    value,
    render,
  } = props;
  const isArray = _.isArray(value);
  const classes = classNames(
    styles.value,
    isArray && styles['value--array'],
  );
  if (isArray) {
    if (value.length === 0) return '–';
    return (
      <div className={classes} data-cy="row-value">
        {value.map((r) => {
          const content = render
            ? render(r)
            : 'Specify "render" prop';
          return (
            <div className={styles['value__row']} key={r.id}>
              {content}
            </div>
          );
        })}
      </div>
    );
  }
  const isPlaceholder = _.isNil(value);
  const content = isPlaceholder ? '–' : value;
  return (
    <div className={classes} data-cy="row-value">
      {content}
    </div>
  );
};

const Row = (props) => {
  const { i, id, title, type, bold, striked, hint } = props;
  const classes = classNames(
    styles.row,
    bold && styles['row--bold'],
    striked && styles['row--striked'],
    { [styles[`row--${type}`]]: type },

  );
  return (
    <div className={classes} data-cy={`row-${id || i}`}>
      <div className={styles.property} data-cy="row-property">
        {title}
        {hint && (
          <Tooltip title={hint}>
            <Icon name="info-circle" />
          </Tooltip>
        )}
      </div>
      <Value {...props} />
    </div>
  );
};

const Section = (props) => {
  const { title, properties } = props;
  return (
    <div className={styles.section}>
      {title && (
        <h5 className={styles['section__title']}>
          {title}
        </h5>
      )}
      {properties.filter(Boolean).map((p, i) => <Row key={i} {...p} i={i} />)}
    </div>
  );
};


const PropertyList = (props) => {
  const { className, config, layout, size } = props;
  const classes = classNames(
    styles['property-list'],
    styles[`property-list--${layout}`],
    styles[`property-list--${size}`],
    className,
  );
  return (
    <div className={classes} data-cy="property-list">
      {config.filter(Boolean).map((c, i) => <Section key={i} {...c} />)}
    </div>
  );
};

PropertyList.defaultProps = {
  config: [],
  layout: 'horizontal',
  size: 'default',
};

PropertyList.propTypes = {
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['default', 'small']),
  config: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    properties: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
      ]),
      bold: PropTypes.bool,
      striked: PropTypes.bool,
      hint: PropTypes.string,
      type: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
      render: PropTypes.func,
    })),
  })),
};

export default PropertyList;
