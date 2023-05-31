import _ from 'lodash';
import { compose, withState, withHandlers, lifecycle, mapProps } from 'react-recompose';
import withRouter from '@hocs/utils/withRouter';
import withOptions from '@hocs/utils/withOptions';
import withQuery from '@hocs/utils/withQuery';
import withAuth from '@hocs/withAuth';
import message from '@components/Core/message';
import Events from '@utils/events';

const HOC = (accessor, options) => compose(
  withRouter(),
  withAuth(),
  withOptions({
    name: '$recordOptions',
    options,
    defaults: {
      method: () => {},
      reducer: () => ({}),
      initialState: () => ({}),
      wrap: data => data,
      handlers: {},
      onSuccess: null,
      autoFetch: true,
    },
  }),
  withState('recordState', 'setRecordState', (props) => {
    const { $recordOptions: { initialState, autoFetch } } = props;
    const defaultState = {
      timestamp: 0,
      loading: autoFetch,
      errors: null,
      data: null,
    };
    return {
      ...defaultState,
      ...initialState(defaultState, props),
    };
  }),
  withHandlers({
    fetchRecord: props => async () => {
      const {
        setRecordState,
        recordState: { timestamp },
        $recordOptions: {
          method,
          onSuccess,
          reducer,
          wrap,
        },
      } = props;
      try {
        if (!method) throw new Error('No method provided to fetch record');
        setRecordState(s => ({
          ...s,
          loading: !timestamp,
          error: null,
        }));
        const { data } = await method(props);
        const wrapped = wrap(data);
        const reducedState = reducer ? await reducer(wrapped) : {};
        if (onSuccess) await onSuccess(data, reducedState, props);
        await setRecordState(s => ({
          ...s,
          data: wrapped,
          loading: false,
          timestamp: Date.now(),
          ...reducedState,
        }));
      } catch (error) {
        setRecordState(s => ({ ...s, loading: false, error }));
        message.responseError(error);
      }
    },
    getRecord: props => () => {
      const { recordState } = props;
      return recordState.data;
    },
  }),
  withHandlers(({ $recordOptions: { handlers } }) => {
    return { ...handlers };
  }),
  mapProps((props) => {
    const { $recordOptions: { handlers } } = props;
    const handlersKeys = Object.keys(handlers);
    const toSkip = [
      '$recordOptions',
      'recordState',
      'setRecordState',
      'fetchRecord',
      'getRecord',
      ...handlersKeys,
    ];
    const passedProps = _.omit(props, toSkip);
    const controller = {
      options: props.$recordOptions,
      state: props.recordState,
      fetch: props.fetchRecord,
      get: props.getRecord,
      ..._.pick(props, handlersKeys),
    };
    return {
      ...passedProps,
      [accessor]: controller,
    };
  }),
  lifecycle({
    componentDidMount() {
      const { props } = this;
      const $controller = props[accessor];
      const { options, fetch } = $controller; // eslint-disable-line
      if (options.autoFetch) fetch();
      Events.addListener(accessor, (data) => {
        const { action, payload } = data;
        const method = _.get($controller, action);
        if (method) return method(payload);
      });
    },
    componentDidUpdate(prevProps) {
      const prevController = prevProps[accessor];
      const controller = this.props[accessor];

      const prevKey = prevController.options.key;
      const { key } = controller.options;

      const shouldRefetch = prevKey !== key;
      if (shouldRefetch) controller.fetch();
    },
    componentWillUnmount() {
      Events.removeListener(accessor);
    },
  }),
);

export default HOC;
