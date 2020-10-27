"use strict";

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const mapFilterFormContainer = map.querySelector(`.map__filters-container`);
const mapFilterForm = mapFilterFormContainer.querySelector(`.map__filters`);
const mapFilterFormSelects = mapFilterForm.querySelectorAll(`select`);
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
const formResetButton = form.querySelector(`.ad-form__reset`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const main = document.querySelector(`main`);
const housingType = mapFilterForm.querySelector(`#housing-type`);
const housingPrice = mapFilterForm.querySelector(`#housing-price`);
const housingRooms = mapFilterForm.querySelector(`#housing-rooms`);
const housingGuests = mapFilterForm.querySelector(`#housing-guests`);
const featuresInputs = mapFilterForm.querySelectorAll(`input[name="features"]`);
const fileAvatarChooser = form.querySelector(`.ad-form-header__input`);
const avatarPreview = form.querySelector(`.ad-form-header__preview img`);
const fileHousingChooser = form.querySelector(`.ad-form__input`);
const housingPreview = form.querySelector(`.ad-form__photo`);

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
  mapFilterForm,
  mapFilterFormContainer,
  mapFilterFormSelects,
  formFieldsets,
  cardTemplate,
  pinTemplate,
  formResetButton,
  successTemplate,
  errorTemplate,
  main,
  housingType,
  housingPrice,
  housingRooms,
  housingGuests,
  featuresInputs,
  fileAvatarChooser,
  avatarPreview,
  fileHousingChooser,
  housingPreview
};
