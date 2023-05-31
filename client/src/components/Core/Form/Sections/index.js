import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import Fields from '../Fields';
import FormUtils from '../utils';
import styles from './styles.modules.scss';

const Section = (props) => {
  const {
    section,
    visible,
    size,
  } = props;
  const {
    id,
    title,
    description,
    fields,
    className,
    hidden,
    disabled,
    span,
  } = section;
  const classes = classNames(
    styles.section,
    { [styles['section--disabled']]: disabled },
    { [styles['section--visible']]: !!visible },
    { [styles['section--hidden']]: hidden || !visible },
    className,
  );
  const spans = FormUtils.getSpans(span, 'section');
  return (
    <div
      className={classes}
      data-cy="form-section"
      data-section-id={id}
    >
      <Row type="flex">
        <Col {...spans}>
          {disabled && (
            <div className={styles['disabled-overlay']} data-cy="form-section__disabled-overlay">
              <h4>{disabled.text || 'Disabled'}</h4>
              <span>{disabled.description}</span>
            </div>
          )}
          {title && (
            <div className={styles.section__header} data-cy="section-header">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          )}
        </Col>
      </Row>
      <div className={styles.section__fields} data-cy="section-fields">
        <Fields
          fields={fields}
          size={size}
        />
      </div>
    </div>
  );
};

Section.defaultProps = {
  fields: [],
};

const Sections = (props) => {
  const {
    // Passed props
    sections,
    size,
    // Dynamic props
    withPagination,
    page,
  } = props;
  return (
    <div className={styles.sections} data-cy="form-sections">
      {sections.map((section, i) => {
        if (!section) return null; // Skipping empty sections
        const visible = withPagination
          ? page.id === section.page
          : true;
        return (
          <Section
            key={section.id || i}
            visible={visible}
            section={section}
            size={size}
          />
        );
      })}
    </div>
  );
};

export default Sections;
