"use strict";

(function () {
  window.form.disabledForm(window.elements.formFieldsets);
  window.form.disabledForm(window.elements.mapFiltersSelects);

  window.elements.addressInput.value = window.form.getMainPinCoordinates();
  window.elements.addressInput.setAttribute(`readonly`, ``);
  window.elements.form.addEventListener(`change`, window.form.formHandler);

  window.elements.mapPinMain.addEventListener(`keydown`, window.map.onEnterPress);

  window.elements.mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let drug = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      drug = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((window.elements.mapPinMain.offsetTop - shift.y) > window.util.PIN_COORDS.MIN_Y && (window.elements.mapPinMain.offsetTop - shift.y) < window.util.PIN_COORDS.MAX_Y) {
        window.elements.mapPinMain.style.top = `${window.elements.mapPinMain.offsetTop - shift.y}px`;
      }
      if ((window.elements.mapPinMain.offsetLeft - shift.x) < window.util.PIN_COORDS.MAX_X && (window.elements.mapPinMain.offsetLeft - shift.x) > window.util.PIN_COORDS.MIN_X) {
        window.elements.mapPinMain.style.left = `${window.elements.mapPinMain.offsetLeft - shift.x}px`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      window.elements.addressInput.value = window.form.getMainPinCoordinates();

      if (!drug) {
        window.map.activateMap();
      }
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();

