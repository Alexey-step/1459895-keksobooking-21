"use strict";

(() => {
  const DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (cb) {
    let lastTimeout = null;

    return function (...rest) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb.apply(null, ...rest);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
