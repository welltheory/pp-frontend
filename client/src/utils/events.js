import _ from 'lodash';

const isIFrame = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

class Events {
  constructor() {
    this.listeners = {};
  }

  addListener(key, method) {
    if (this.listeners[key]) {
      console.warn('Events listener already exists.');
      return;
    }
    const listener = ({ detail }) => method(detail);
    window.addEventListener(key, listener);
    this.listeners[key] = listener;
  }

  removeListener(key) {
    if (!this.listeners[key]) {
      console.warn('No such listener.');
      return;
    }
    window.removeEventListener(key, this.listeners[key]);
    delete this.listeners[key];
  }

  dispatch(key, detail, options = {}) {
    if (options.startsWith) {
      const keys = Object.keys(this.listeners)
        .filter((okey) => _.startsWith(okey, key));
      keys.forEach((okey) => {
        const event = new CustomEvent(okey, { detail });
        window.dispatchEvent(event);
      });
      return;
    }
    const event = new CustomEvent(key, { detail });
    window.dispatchEvent(event);
    if (isIFrame()) {
      window.top.postMessage({ key, detail }, '*');
    }
  }
}

const instance = new Events();

window.events = instance;

export default instance;
