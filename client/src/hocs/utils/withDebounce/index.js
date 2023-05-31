import { createElement, Component } from 'react';
import debounce from 'just-debounce-it';

const debounceHandler = (handlerName, delay, leadingCall) => (Target) => {
  class DebounceHandler extends Component {
    constructor(props, context) {
      super(props, context);

      const delayValue = typeof delay === 'function' ? delay(props) : delay;

      this.debouncedPropInvoke = debounce(
        (...args) => this.props[handlerName](...args),
        delayValue,
        leadingCall,
      );

      this.handler = (e, ...rest) => {
        if (e && typeof e.persist === 'function') {
          e.persist();
        }

        return this.debouncedPropInvoke(e, ...rest);
      };
    }

    render() {
      return createElement(Target, {
        ...this.props,
        [handlerName]: this.handler,
      });
    }
  }

  return DebounceHandler;
};

export default debounceHandler;
