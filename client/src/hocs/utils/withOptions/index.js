import _ from 'lodash';
import { compose, withProps } from 'react-recompose';

const getOptions = ({ options, defaults = {} }) => (props) => {
  const results = (() => {
    if (_.isPlainObject(options)) return options;
    if (_.isFunction(options)) return options(props);
    return {};
  })();
  return {
    ...defaults,
    ...results,
  };
};

const HOC = (config) => compose(
  withProps((props) => {
    const options = getOptions(config)(props);
    return {
      ...props,
      [config.name]: options,
      hocoptions: true,
    };
  }),
);

export default HOC;
