"use strict";

(function () {

  const enableForm = (element) => {
    for (let item of element) {
      item.removeAttribute(`disabled`);
    }
  };

  const hideElements = (items) => {
    for (let item of items) {
      item.style.display = `none`;
    }
  };

  const showElement = (item) => {
    item.style.display = `block`;
    currentCard = item;
    document.addEventListener(`keydown`, onEscPress);
  };

  const hideElement = (item) => {
    item.style.display = `none`;
    currentCard = null;
    document.removeEventListener(`keydown`, onEscPress);
  };

  const disabledForm = (element) => {
    for (let item of element) {
      item.setAttribute(`disabled`, `disabled`);
    }
  };

  disabledForm(window.util.FORM_FIELDSETS);
  disabledForm(window.util.MAP_FILTERS_SELECTS);

  const activateMap = () => {
    window.util.MAP.classList.remove(`map--faded`);
    window.util.FORM.classList.remove(`ad-form--disabled`);
    enableForm(window.util.FORM_FIELDSETS);
    enableForm(window.util.MAP_FILTERS_SELECTS);
    window.util.MAP_PINS.appendChild(window.pin.filingBlock(window.data.OBJECTS_ARRAY));
    window.util.MAP.insertBefore(window.card.filingCards(window.data.OBJECTS_ARRAY), window.util.MAP_FILTERS_CONTAINER);
    window.util.ADDRESS_INPUT.value = window.form.getMainPinCoordinates();
    showObjectCard();
    window.util.MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseDownPress);
    window.util.MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  const openPopup = (pin, card) => {
    for (let i = 0; i < pin.length; i++) {
      pin[i].addEventListener(`click`, () => {
        if (currentCard) {
          hideElement(currentCard);
        }
        showElement(card[i]);
      });
      pin[i].addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          if (currentCard) {
            hideElement(currentCard);
          }
          showElement(card[i]);
        }
      });
    }
  };

  const showObjectCard = () => {
    const popupsClose = document.querySelectorAll(`.popup__close`);
    const pins = window.util.MAP.querySelectorAll(`.map__pin`);
    const pinsArray = createArrayOfPins(pins);
    const mapCards = document.querySelectorAll(`.map__card`);
    hideElements(mapCards);
    openPopup(pinsArray, mapCards);
    closePopup(popupsClose, mapCards);
  };

  const closePopup = (closeButtons, cards) => {
    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener(`click`, () => {
        hideElement(cards[i]);
      });
    }
  };

  const createArrayOfPins = (items) => {
    let arrayOfPins = [];
    for (let i = 0; i < items.length; i++) {
      if (!items[i].classList.contains(`map__pin--main`)) {
        arrayOfPins.push(items[i]);
      }
    }
    return arrayOfPins;
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

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideElement(currentCard);
    }
  };

  let currentCard = null;

  window.util.MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseDownPress);
  window.util.MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
