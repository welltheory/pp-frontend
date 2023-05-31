import _ from 'lodash';
import LocalStorage from '@utils/localStorage';

export default {
  getForm: props => {
    const { formOptions } = props;
    const { propName } = formOptions;
    return props[propName];
  },
  handleValuesChange: props => (changedValues, allValues, passedConfig) => {
    const { formOptions, formState } = props;
    const config = {
      skip: [],
      ...passedConfig,
    };
    const { handlers } = formState;
    const shouldRun = key => !_.includes(config.skip, key);
    // Handle custom onValuesChange
    if (shouldRun('manualUpdate') && handlers.onValuesChange) {
      handlers.onValuesChange(changedValues, allValues);
    }
    return Promise.resolve();
  },
};
