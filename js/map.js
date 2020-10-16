"use strict";

(function () {

  const activateMap = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.elements.form.classList.remove(`ad-form--disabled`);
    window.load(window.pin.activateServerDownloads, window.util.errorHandler, window.util.URL);
    window.elements.mapPinMain.removeEventListener(`mousedown`, onMouseDownPress);
    window.elements.mapPinMain.removeEventListener(`keydown`, onEnterPress);
  };

  const deactivateMap = () => {
    window.elements.map.classList.add(`map--faded`);
    window.elements.form.classList.add(`ad-form--disabled`);
    window.form.disabledForm(window.elements.formFieldsets);
    window.form.disabledForm(window.elements.mapFiltersSelects);
    removePins();
    removeCards();
    window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMouseDownPress);
    window.elements.mapPinMain.addEventListener(`keydown`, window.map.onEnterPress);
  };

  const removePins = () => {
    const pins = window.elements.map.querySelectorAll(`.map__pin`);
    for (let i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains(`map__pin--main`)) {
        pins[i].remove();
      }
    }
  };

  const removeCards = () => {
    const mapCard = window.elements.map.querySelectorAll(`.map__card`);
    for (let i = 0; i < mapCard.length; i++) {
      mapCard[i].remove();
    }
  };

  const onMouseDownPress = (evt) => {
    if (evt.button === 0) {
      activateMap();
    }
  };

  const onEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activateMap();
    }
  };

  window.map = {
    onMouseDownPress,
    onEnterPress,
    activateMap,
    deactivateMap
  };

})();
