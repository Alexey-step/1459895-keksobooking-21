"use strict";

(function () {

  const getNewCoordsPin = (shiftY, shiftX) => {
    let newPinYCoord = window.elements.mapPinMain.offsetTop - shiftY;
    let newPinXCoord = window.elements.mapPinMain.offsetLeft - shiftX;
    if (newPinYCoord > window.util.PIN_COORDS.MIN_Y && newPinYCoord < window.util.PIN_COORDS.MAX_Y) {
      window.elements.mapPinMain.style.top = `${newPinYCoord}px`;
    }
    if (newPinXCoord < window.util.PIN_COORDS.MAX_X && newPinXCoord > window.util.PIN_COORDS.MIN_X) {
      window.elements.mapPinMain.style.left = `${newPinXCoord}px`;
    }
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();


      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      getNewCoordsPin(shift.y, shift.x);
      window.elements.addressInput.value = window.form.getMainPinCoordinates();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      window.elements.addressInput.value = window.form.getMainPinCoordinates();

    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMouseDown
  };

})();
