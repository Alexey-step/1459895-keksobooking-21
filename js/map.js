"use strict";

const activateMap = () => {
  window.elements.map.classList.remove(`map--faded`);
  window.elements.form.classList.remove(`ad-form--disabled`);
  window.load(window.filter.onSuccessLoad, window.util.onErrorLoad, window.util.URL_LOAD);
  window.elements.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDownPress);
  window.elements.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterPress);
};

const deactivateMap = () => {
  window.elements.map.classList.add(`map--faded`);
  window.elements.form.classList.add(`ad-form--disabled`);
  window.form.disabledForm(window.elements.formFieldsets);
  window.form.disabledForm(window.elements.mapFilterFormSelects);
  removePins();
  removeCards();
  window.pin.resetCurrent();
  returnMainPinStartCoordinates();
  window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMapPinMainMouseDownPress);
  window.elements.mapPinMain.addEventListener(`keydown`, window.map.onMapPinMainEnterPress);
};

const removePins = () => {
  const pins = window.elements.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => pin.remove());
};

const removeCards = () => {
  const mapCards = window.elements.map.querySelectorAll(`.map__card`);
  mapCards.forEach((card) => card.remove());
};

const returnMainPinStartCoordinates = () => {
  window.elements.mapPinMain.style.left = `${window.util.MAIN_PIN_START_COORDINATES.X}px`;
  window.elements.mapPinMain.style.top = `${window.util.MAIN_PIN_START_COORDINATES.Y}px`;
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
  activateMap,
  deactivateMap,
  removePins,
  removeCards
};
