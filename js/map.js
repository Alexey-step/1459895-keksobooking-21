"use strict";

(function () {

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

  const activateMap = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.elements.form.classList.remove(`ad-form--disabled`);
    window.form.enableForm(window.elements.formFieldsets);
    window.form.enableForm(window.elements.mapFiltersSelects);
    window.elements.mapPins.appendChild(window.pin.filingBlock(window.data.objects));
    window.elements.map.insertBefore(window.card.filingCards(window.data.objects), window.elements.mapFiltersContainer);
    window.elements.addressInput.value = window.form.getMainPinCoordinates();
    showObjectCard();
    window.elements.mapPinMain.removeEventListener(`mousedown`, onMouseDownPress);
    window.elements.mapPinMain.removeEventListener(`keydown`, onEnterPress);
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
    const pins = window.elements.map.querySelectorAll(`.map__pin`);
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

  window.map = {
    onMouseDownPress,
    onEnterPress,
    activateMap
  };

})();
