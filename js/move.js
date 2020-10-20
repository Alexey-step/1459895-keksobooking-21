"use strict";

(() => {

  const onMouseDown = (evt) => {
    evt.preventDefault();

    const {left, top} = document.querySelector(`.map`).getBoundingClientRect();

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      if ((moveEvt.clientY - top - window.util.MAP_MAIN_PIN_SIZE.HEIGHT / 2) > window.util.PIN_COORDS.MIN_Y && (moveEvt.clientY - top - window.util.MAP_MAIN_PIN_SIZE.HEIGHT / 2) < window.util.PIN_COORDS.MAX_Y) {
        window.elements.mapPinMain.style.top = `${moveEvt.clientY - top - window.util.MAP_MAIN_PIN_SIZE.HEIGHT / 2}px`;
      }
      if ((moveEvt.clientX - left - window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2) < window.util.PIN_COORDS.MAX_X && (moveEvt.clientX - left - window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2) > window.util.PIN_COORDS.MIN_X) {
        window.elements.mapPinMain.style.left = `${moveEvt.clientX - left - window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2}px`;
      }
      window.form.updateAddressValue();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      window.form.updateAddressValue();

    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMouseDown
  };

})();
