import _ from 'lodash';
import { scrollTo } from 'scroll-js';
import Time from '@utils/time';

const Scroll = {
  getEl: (selector) => {
    if (typeof selector === 'string') {
      return document.querySelector(selector);
    }
    return selector;
  },
  top: (selector, options = {}) => {
    const {
      top = 0,
      delay = 50,
    } = options;
    setTimeout(() => {
      const $el = Scroll.getEl(selector) || window || document.body;
      $el.scroll({ top, left: 0, behavior: 'smooth' });
    }, delay);
  },
  toggleBodyLock: (value) => {
    const lockClass = 'scroll-lock';
    const $body = document.querySelector('body');
    if (_.isNil(value)) return $body.classList.toggle(lockClass);
    if (value) return $body.classList.add(lockClass);
    return $body.classList.remove(lockClass);
  },
  intoView: async (options = {}) => {
    const {
      containerSelector = 'body',
      elementSelector,
      topFallback,
      center,
      delay,
      duration = 150,
      easing = 'ease-in-out',
      offset,
    } = options;
    if (delay) await Time.delay(delay);
    const $container = document.querySelector(containerSelector);
    const $el = document.querySelector(elementSelector);

    if (!$el || !$container) {
      if (topFallback) Scroll.top();
      return;
    }
    const top = window.pageYOffset + $el.getBoundingClientRect().top - $container.getBoundingClientRect().top;
    const config = { top, duration, easing };
    if (center) {
      const height = $el.offsetHeight;
      config.top -= height / 2;
    }
    if (offset) {
      config.top += offset;
    }
    scrollTo($container, config);
    return true;
  },
};

window.Scroll = Scroll;

export default Scroll;
