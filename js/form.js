"use strict";

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
  const room = window.elements.roomsNumber.value;
  if (room === `1`) {
    window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${room} гостя`);
  } else if (room === `100`) {
    window.elements.guestsNumber.setCustomValidity(`Это размещение не для гостей`);
  } else {
    window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${room} гостей`);
  }

  window.elements.roomsNumber.reportValidity();
  window.elements.guestsNumber.reportValidity();
};

const clearError = () => {
  window.elements.roomsNumber.setCustomValidity(``);
  window.elements.guestsNumber.setCustomValidity(``);
};

const formHandler = (evt) => {
  if (evt.target === window.elements.roomsNumber || evt.target === window.elements.guestsNumber) {
    const roomNumberVal = window.elements.roomsNumber.value;
    const guestsNumberVal = window.elements.guestsNumber.value;
    const valid = chekValidGuestsSelector(roomNumberVal, guestsNumberVal);
    return !valid ? showError() : clearError();
  }
  if (evt.target === window.elements.formTitleInput) {
    return chekValidTitle();
  }
  if (evt.target === window.elements.formPrice || evt.target === window.elements.formType) {
    return checkValidPrice(window.util.MIN_PRICES, window.elements.formType);
  }
  if (evt.target === window.elements.formTimeIn) {
    return syncTime(window.elements.formTimeIn, window.elements.formTimeOut);
  }
  if (evt.target === window.elements.formTimeOut) {
    return syncTime(window.elements.formTimeOut, window.elements.formTimeIn);
  }
  if (evt.target === window.elements.fileAvatarChooser) {
    return window.preview.avatarPreviewHandler();
  }
  if (evt.target === window.elements.fileHousingChooser) {
    return window.preview.housingPreviewHandler();
  }
  return true;
};

const syncTime = (time1, time2) => {
  time2.selectedIndex = time1.selectedIndex;
};

const checkValidPrice = (price, type) => {
  let inputPrice = parseInt(window.elements.formPrice.value, 10);
  window.elements.formPrice.placeholder = price[type.selectedIndex];
  if (inputPrice < price[type.selectedIndex]) {
    window.elements.formPrice.setCustomValidity(`Минимальная цена для данного размещения ${price[type.selectedIndex]}`);
  } else if (inputPrice > window.util.MAX_PRICE) {
    window.elements.formPrice.setCustomValidity(`Максимально возможное значение ${window.util.MAX_PRICE}`);
  } else {
    window.elements.formPrice.setCustomValidity(``);
  }
};

const chekValidTitle = () => {
  let inputValueLength = window.elements.formTitleInput.value.length;
  if (inputValueLength < window.util.MIN_LENGTH_VALUE) {
    window.elements.formTitleInput.setCustomValidity(`Слишком коротко, минимальная длинна заголовка ${window.util.MIN_LENGTH_VALUE} симв, допишите еще ${window.util.MIN_LENGTH_VALUE - inputValueLength} симв.`);
  } else if (inputValueLength > window.util.MAX_LENGTH_VALUE) {
    window.elements.formTitleInput.setCustomValidity(`Слишком длинное название, максимальная длинна ${window.util.MAX_LENGTH_VALUE} симв., уберите лишние ${inputValueLength - window.util.MAX_LENGTH_VALUE} симв.`);
  } else {
    window.elements.formTitleInput.setCustomValidity(``);
  }

  window.elements.formTitleInput.reportValidity();
};

const getMainPinCoordinates = () => {
  let mapPinMainX = window.elements.mapPinMain.style.left.replace(/[^\d.-]/g, ``);
  let mapPinMainY = window.elements.mapPinMain.style.top.replace(/[^\d.-]/g, ``);
  let coordinates;
  if (window.elements.map.classList.contains(`map--faded`)) {
    coordinates = `${Math.floor(+mapPinMainX + window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2)}, ${Math.floor(+mapPinMainY + window.util.MAP_MAIN_PIN_SIZE.HEIGHT / 2)}`;
  } else {
    coordinates = `${Math.floor(+mapPinMainX + window.util.MAP_MAIN_PIN_SIZE.WIDTH / 2)}, ${Math.floor(+mapPinMainY + window.util.MAP_MAIN_PIN_SIZE.MAX_HEIGHT)}`;
  }
  return coordinates;
};

const updateAddressValue = () => {
  window.elements.addressInput.value = window.form.getMainPinCoordinates();
};

const enableForm = (element) => {
  for (let item of element) {
    item.removeAttribute(`disabled`);
  }
};

const disabledForm = (element) => {
  for (let item of element) {
    item.setAttribute(`disabled`, `disabled`);
  }
};

const onFormSubmit = (evt) => {
  window.upload(new FormData(window.elements.form), () => {
    window.map.deactivateMap();
    window.elements.form.reset();
    window.form.updateAddressValue();
    window.util.showSuccessMessage();
  }, window.util.errorHandler);
  evt.preventDefault();
};

const onFormResetClick = (evt) => {
  evt.preventDefault();
  formReset();
};

const onFormResetEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    formReset();
  }
};

const formReset = () => {
  window.elements.form.reset();
  formHousingPreviewReset();
  formAvatarPreviewReset();
  window.form.updateAddressValue();
};

const formHousingPreviewReset = () => {
  if (window.elements.housingPreview.children.length > 0) {
    window.elements.housingPreview.innerHTML = ``;
  }
};

const formAvatarPreviewReset = () => {
  if (window.elements.avatarPreview.src !== `img/muffin-grey.svg`) {
    window.elements.avatarPreview.src = `img/muffin-grey.svg`;
  }
};

window.form = {
  getMainPinCoordinates,
  formHandler,
  enableForm,
  disabledForm,
  updateAddressValue,
  onFormSubmit,
  onFormResetClick,
  onFormResetEnterPress
};
