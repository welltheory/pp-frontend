import _ from 'lodash';
import { compose, withState, withHandlers, lifecycle } from 'react-recompose';
import Strings from '@utils/strings';

export default (stateName, stateUpdaterName, initialState) => {
  const updateMethodName = (() => {
    const capitalized = Strings.capitalize(stateName);
    return `update${capitalized}`;
  })();
  const getUpdater = props => (props.__getMounted()
    ? props[stateUpdaterName]
    : (x, cb) => cb());
  return compose(
    withHandlers(() => {
      let mounted = true;
      return {
        __getMounted: () => () => mounted,
        __setMounted: () => (value) => {
          mounted = value;
        },
      };
    }),
    lifecycle({
      componentWillUnmount() {
        this.props.__setMounted(false);
      },
    }),
    withState(stateName, stateUpdaterName, initialState),
    withHandlers({
      [stateUpdaterName]: props => (data) => {
        const updater = getUpdater(props);
        return new Promise((resolve) => {
          return updater(data, state => resolve(state));
        });
      },
    }),
    withHandlers({
      [updateMethodName]: props => (data) => {
        const updater = props[stateUpdaterName];
        const copy = _.cloneDeep(props[stateName]);
        const nextState = _.merge(copy, data);
        updater(nextState);
      },
    }),
  );
};
