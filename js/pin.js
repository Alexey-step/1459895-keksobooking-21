"use strict";

(function () {

  const renderMapPin = (object) => {
    let mapPin = window.elements.pinTemplate.cloneNode(true);

    mapPin.querySelector(`img`).src = object.author.avatar;
    mapPin.querySelector(`img`).alt = object.offer.title;
    mapPin.style.left = (object.location.x - (window.util.PIN_SIZES.WIDTH / 2)) + `px`;
    mapPin.style.top = (object.location.y - window.util.PIN_SIZES.HEIGHT) + `px`;


    return mapPin;
  };

  const activateServerDownloads = (arr) => {
    let newArr = filterArray(arr);
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < newArr.length; i++) {
      fragment.appendChild(renderMapPin(newArr[i]));
    }
    window.elements.mapPins.appendChild(fragment);
    window.card.activateCards(newArr);
    window.form.enableForm(window.elements.formFieldsets);
    window.form.enableForm(window.elements.mapFiltersSelects);
  };

  const filterArray = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hasOwnProperty(`offer`) && newArr.length < 5) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  let currentCard = null;

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

  let currentIndex = 0;

  const openPopup = (pin, card) => {
    for (let i = 0; i < pin.length; i++) {
      pin[i].addEventListener(`click`, () => {
        if (currentCard) {
          pin[currentIndex].classList.remove(`map__pin--active`);
          hideElement(currentCard);
        }
        pin[i].classList.add(`map__pin--active`);
        showElement(card[i]);
        currentIndex = i;
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

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideElement(currentCard);
    }
  };

  window.pin = {
    activateServerDownloads,
    showObjectCard
  };
})();
