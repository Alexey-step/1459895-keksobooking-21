"use strict";

(function () {

  const renderCard = (object) => {
    let card = window.util.CARD_TEMPLATE.cloneNode(true);
    const OfferType = {
      palace: `дворец`,
      flat: `квартира`,
      house: `дом`,
      bungalow: `бунгало`
    };

    const createCapacityString = () => {
      let guestString = object.offer.guests === 1 ? `${object.offer.guests} гостя` : `${object.offer.guests} гостей`;
      let roomsString = object.offer.rooms === 1 ? `${object.offer.rooms} комната для ` : `${object.offer.rooms} комнаты для `;
      return roomsString + guestString;
    };

    card.querySelector(`.popup__title`).textContent = object.offer.title;
    card.querySelector(`.popup__text--address`).textContent = object.offer.address;
    card.querySelector(`.popup__text--price`).textContent = object.offer.price + `₽/ночь`;
    card.querySelector(`.popup__type`).textContent = OfferType[object.offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = createCapacityString();
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
    for (let item of window.util.FEATURES) {
      if (!object.offer.features.includes(item)) {
        card.querySelector(`.popup__feature--${item}`).remove();
      }
    }
    card.querySelector(`.popup__description`).textContent = object.offer.descriptions;
    card.querySelector(`.popup__photo`).src = object.offer.photos[0];
    let cardPopupPhotos = card.querySelector(`.popup__photos`);
    for (let i = 1; i < object.offer.photos.length; i++) {
      cardPopupPhotos.insertAdjacentHTML(`beforeend`, `<img src=${object.offer.photos[i]} class=popup__photo width=45 height=40 alt="Фотография жилья" >`);
    }
    card.querySelector(`.popup__avatar`).src = object.author.avatar;
    for (let i = 0; i < card.childNodes.length; i++) {
      if (!card.childNodes[i].textContent) {
        card.removeChild(card.childNodes[i]);
      }
      if (!card.childNodes[i].src) {
        card.removeChild(card.childNodes[i]);
      }
    }
    return card;
  };

  const filingCards = (arr) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderCard(arr[i]));
    }
    return fragment;
  };

  window.card = {
    filingCards
  };

})();
