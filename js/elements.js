"use strict";

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const roomsNumber = form.querySelector(`#room_number`);
  const guestsNumber = form.querySelector(`#capacity`);
  const formTitleInput = form.querySelector(`#title`);
  const formPrice = form.querySelector(`#price`);
  const formType = form.querySelector(`#type`);
  const formTimeIn = form.querySelector(`#timein`);
  const formTimeOut = form.querySelector(`#timeout`);
  const addressInput = form.querySelector(`#address`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const formReset = form.querySelector(`.ad-form__reset`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const main = document.querySelector(`main`);

  window.elements = {
    form,
    roomsNumber,
    guestsNumber,
    formTitleInput,
    formPrice,
    formType,
    formTimeIn,
    formTimeOut,
    addressInput,
    map,
    mapPins,
    mapPinMain,
    mapFiltersContainer,
    mapFiltersSelects,
    formFieldsets,
    cardTemplate,
    pinTemplate,
    formReset,
    successTemplate,
    errorTemplate,
    main
  };

})();
