"use strict";

const activateMap = () => {
  window.elements.map.classList.remove(`map--faded`);
  window.form.enableForm(window.elements.formFieldsets);
  window.load(window.filter.onSuccessLoad, window.util.onErrorLoad, window.util.URL_LOAD);
  window.elements.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDownPress);
  window.elements.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterPress);
};

const deactivateMap = () => {
  window.elements.map.classList.add(`map--faded`);
  window.form.disabledForm(window.elements.formFieldsets);
  window.form.disabledFilterFormElements(window.elements.mapFilterFormSelects);
  window.pin.removePins();
  window.card.removeCards();
  window.pin.resetCurrent();
  resetMainPinCoordinates();
  window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMapPinMainMouseDownPress);
  window.elements.mapPinMain.addEventListener(`keydown`, window.map.onMapPinMainEnterPress);
};

const resetMainPinCoordinates = () => {
  window.elements.mapPinMain.style.left = `${window.util.MAIN_PIN_START_COORDINATES.X}px`;
  window.elements.mapPinMain.style.top = `${window.util.MAIN_PIN_START_COORDINATES.Y}px`;
  window.form.updateAddressValue();
};

const onMapPinMainMouseDownPress = (evt) => {
  if (evt.button === 0) {
    activateMap();
  }
};

const onMapPinMainEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    activateMap();
  }
};

window.map = {
  onMapPinMainMouseDownPress,
  onMapPinMainEnterPress,
  deactivateMap,
};
