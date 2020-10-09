"use strict";

(function () {

  const chekValidGuestsSelector = (room, guests) => {
    room = +room;
    guests = +guests;
    if (room === window.util.MAX_ROOM && guests !== window.util.MIN_GUESTS) {
      return false;
    }
    if (guests > room) {
      return false;
    }
    if (room < window.util.MAX_ROOM && guests === window.util.MIN_GUESTS) {
      return false;
    }
    return true;
  };

  const showError = () => {
    const room = window.util.ROOMS_NUMBER.value;
    if (room === `1`) {
      window.util.GUESTS_NUMBER.setCustomValidity(`Вместительность данного размещения не более ${room} гостя`);
    } else if (room === `100`) {
      window.util.GUESTS_NUMBER.setCustomValidity(`Это размещение не для гостей`);
    } else {
      window.util.GUESTS_NUMBER.setCustomValidity(`Вместительность данного размещения не более ${room} гостей`);
    }

    window.util.ROOMS_NUMBER.reportValidity();
    window.util.GUESTS_NUMBER.reportValidity();
  };

  const clearError = () => {
    window.util.ROOMS_NUMBER.setCustomValidity(``);
    window.util.GUESTS_NUMBER.setCustomValidity(``);
  };

  const formHandler = (evt) => {
    if (evt.target === window.util.ROOMS_NUMBER || evt.target === window.util.GUESTS_NUMBER) {
      const roomNumberVal = window.util.ROOMS_NUMBER.value;
      const guestsNumberVal = window.util.GUESTS_NUMBER.value;
      const valid = chekValidGuestsSelector(roomNumberVal, guestsNumberVal);
      return !valid ? showError() : clearError();
    }
    if (evt.target === window.util.FORM_TITLE_INPUT) {
      return chekValidTitle();
    }
    if (evt.target === window.util.FORM_PRICE || evt.target === window.util.FORM_TYPE) {
      return checkValidPrice(window.util.MIN_PRICES, window.util.FORM_TYPE);
    }
    if (evt.target === window.util.FORM_TIME_IN) {
      return syncTime(window.util.FORM_TIME_IN, window.util.FORM_TIME_OUT);
    }
    if (evt.target === window.util.FORM_TIME_OUT) {
      return syncTime(window.util.FORM_TIME_OUT, window.util.FORM_TIME_IN);
    }
    return true;
  };

  const syncTime = (time1, time2) => {
    time2.selectedIndex = time1.selectedIndex;
  };

  const checkValidPrice = (price, type) => {
    let inputPrice = parseInt(window.util.FORM_PRICE.value, 10);
    window.util.FORM_PRICE.placeholder = price[type.selectedIndex];
    if (inputPrice < price[type.selectedIndex]) {
      window.util.FORM_PRICE.setCustomValidity(`Минимальная цена для данного размещения ${price[type.selectedIndex]}`);
    } else if (inputPrice > window.util.MAX_PRICE) {
      window.util.FORM_PRICE.setCustomValidity(`Максимально возможное значение ${window.util.MAX_PRICE}`);
    } else {
      window.util.FORM_PRICE.setCustomValidity(``);
    }
  };

  const chekValidTitle = () => {
    let inputValueLength = window.util.FORM_TITLE_INPUT.value.length;
    if (inputValueLength < window.util.MIN_LENGTH_VALUE) {
      window.util.FORM_TITLE_INPUT.setCustomValidity(`Слишком коротко, минимальная длинна заголовка ${window.util.MIN_LENGTH_VALUE} симв, допишите еще ${window.util.MIN_LENGTH_VALUE - inputValueLength} симв.`);
    } else if (inputValueLength > window.util.MAX_LENGTH_VALUE) {
      window.util.FORM_TITLE_INPUT.setCustomValidity(`Слишком длинное название, максимальная длинна ${window.util.MAX_LENGTH_VALUE} симв., уберите лишние ${inputValueLength - window.util.MAX_LENGTH_VALUE} симв.`);
    } else {
      window.util.FORM_TITLE_INPUT.setCustomValidity(``);
    }

    window.util.FORM_TITLE_INPUT.reportValidity();
  };

  const getMainPinCoordinates = () => {
    let mapPinMainX = window.util.MAP_PIN_MAIN.style.left.replace(/[^\d.-]/g, ``);
    let mapPinMainY = window.util.MAP_PIN_MAIN.style.top.replace(/[^\d.-]/g, ``);
    let coordinates;
    if (window.util.MAP.classList.contains(`map--faded`)) {
      coordinates = `${Math.floor(+mapPinMainX + window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2)}, ${Math.floor(+mapPinMainY + window.util.MAP_MAIN_PIN_SIZE.HEIGHT / 2)}`;
    } else {
      coordinates = `${Math.floor(+mapPinMainX + window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2)}, ${Math.floor(+mapPinMainY + window.util.MAP_MAIN_PIN_SIZE.MAX_HEIGHT)}`;
    }
    return coordinates;
  };

  window.form = {
    getMainPinCoordinates
  };

  window.util.ADDRESS_INPUT.value = window.form.getMainPinCoordinates();
  window.util.ADDRESS_INPUT.setAttribute(`readonly`, ``);
  window.util.FORM.addEventListener(`change`, formHandler);

})();
