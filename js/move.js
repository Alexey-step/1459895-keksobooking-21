"use strict";

const onMouseDown = (evt) => {
  evt.preventDefault();

  const {left, top} = document.querySelector(`.map`).getBoundingClientRect();

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const limitingPinPositionY = moveEvt.clientY - top - window.util.MAIN_PIN_CENTER;
    const limitingPinPositionX = moveEvt.clientX - left - window.util.MAIN_PIN_CENTER;

    if (limitingPinPositionY >= window.util.PIN_COORDS.MIN_Y && limitingPinPositionY <= window.util.PIN_COORDS.MAX_Y) {
      window.elements.mapPinMain.style.top = `${limitingPinPositionY}px`;
    }
    if (limitingPinPositionX <= window.util.PIN_COORDS.MAX_X && limitingPinPositionX >= window.util.PIN_COORDS.MIN_X) {
      window.elements.mapPinMain.style.left = `${limitingPinPositionX}px`;
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
