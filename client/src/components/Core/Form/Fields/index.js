import React from 'react';
import _ from 'lodash';
import { Row } from 'antd';
import Field from './Field';
import styles from './styles.modules.scss';

const Fields = ({ fields, size }) => {
  return (
    <div className={styles.fields} data-cy="form-fields">
      <Row
        type="flex"
        gutter={16}
      >
        {fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            size={size}
          />
        ))}
      </Row>
    </div>
  );
};

export default Fields;
