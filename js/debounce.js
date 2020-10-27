"use strict";

const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...rest) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...rest);
    }, DEBOUNCE_INTERVAL);
  };
};
