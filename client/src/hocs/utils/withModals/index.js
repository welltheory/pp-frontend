import _ from 'lodash';
import { compose, withState, withHandlers } from 'react-recompose';

const HOC = () => compose(
  withState('modalsState', 'setModalsState', {
    visible: [],
  }),
  withHandlers({
    toggleModal: props => (value) => {
      const { setModalsState } = props;
      setModalsState(s => {
        return {
          ...s,
          visible: _.xor(s.visible, [value]),
        };
      });
    },
    isModalVisible: props => (value) => {
      const { modalsState: { visible } } = props;
      return visible.includes(value);
    },
  }),
);

export default HOC;
