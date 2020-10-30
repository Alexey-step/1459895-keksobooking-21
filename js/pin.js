"use strict";

const renderPin = (item) => {
  let mapPin = window.elements.pinTemplate.cloneNode(true);

  mapPin.querySelector(`img`).src = item.author.avatar;
  mapPin.querySelector(`img`).alt = item.offer.title;
  mapPin.style.left = (item.location.x - (window.util.PIN_SIZES.WIDTH / 2)) + `px`;
  mapPin.style.top = (item.location.y - window.util.PIN_SIZES.HEIGHT) + `px`;

  return mapPin;
};

const renderPins = (items) => {
  let fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(renderPin(item)));
  window.elements.mapPins.appendChild(fragment);
};

const activateServerDownloads = (items) => {
  renderPins(items);
  window.card.activateCards(items);
  window.form.enableFilterFormElements(window.elements.mapFilterFormSelects);
};

let currentCard = null;

const hideCards = (items) => {
  for (let item of items) {
    item.style.display = `none`;
  }
};

const show = (item, pin) => {
  item.style.display = `block`;
  pin.classList.add(`map__pin--active`);
  currentPin = pin;
  currentCard = item;
  document.addEventListener(`keydown`, onEscPress);
};

const hide = (item, pin) => {
  if (currentCard) {
    item.style.display = `none`;
    pin.classList.remove(`map__pin--active`);
    currentCard = null;
    currentPin = 0;
    document.removeEventListener(`keydown`, onEscPress);
  }
};

let currentPin = 0;

const initPinClick = (pin, card) => {
  for (let i = 0; i < pin.length; i++) {
    pin[i].addEventListener(`click`, () => {
      hide(currentCard, currentPin);
      show(card[i], pin[i]);
    });
  }
};

const initCardPopup = () => {
  const popupsClose = document.querySelectorAll(`.popup__close`);
  const pins = window.elements.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  const pinsArray = Array.from(pins);
  const mapCards = document.querySelectorAll(`.map__card`);
  hideCards(mapCards);
  initPinClick(pinsArray, mapCards);
  initCardCloseClick(popupsClose);
};

const initCardCloseClick = (closeButtons) => {
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener(`click`, () => {
      hide(currentCard, currentPin);
    });
  }
};

const onEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    hide(currentCard, currentPin);
  }
};

const resetCurrent = () => {
  currentPin = 0;
  currentCard = null;
};

const removePins = () => {
  const pins = window.elements.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => pin.remove());
};

window.pin = {
  resetCurrent,
  activateServerDownloads,
  initCardPopup,
  removePins
};
