"use strict";

const OfferType = {
  palace: `дворец`,
  flat: `квартира`,
  house: `дом`,
  bungalow: `бунгало`
};

const createCapacityString = (someObject) => {
  let guestString = someObject.offer.guests === 1 ? `${someObject.offer.guests} гостя` : `${someObject.offer.guests} гостей`;
  let roomsString = someObject.offer.rooms === 1 ? `${someObject.offer.rooms} комната для ` : `${someObject.offer.rooms} комнаты для `;
  return roomsString + guestString;
};

const renderCard = (object) => {
  let card = window.elements.cardTemplate.cloneNode(true);

  if (object.offer.rooms !== 0 && object.offer.guests !== 0) {
    card.querySelector(`.popup__text--capacity`).textContent = createCapacityString(object);
  } else {
    card.querySelector(`.popup__text--capacity`).remove();
  }

  card.querySelector(`.popup__title`).textContent = object.offer.title;

  if (object.offer.address !== ``) {
    card.querySelector(`.popup__text--address`).textContent = object.offer.address;
  } else {
    card.querySelector(`.popup__text--address`).remove();
  }

  if (object.offer.price !== ``) {
    card.querySelector(`.popup__text--price`).textContent = object.offer.price + `₽/ночь`;
  } else {
    card.querySelector(`.popup__text--price`).remove();
  }

  if (object.offer.type !== ``) {
    card.querySelector(`.popup__type`).textContent = OfferType[object.offer.type];
  } else {
    card.querySelector(`.popup__type`).remove();
  }

  if (object.offer.checkin !== `` && object.offer.checkout !== ``) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  } else {
    card.querySelector(`.popup__text--time`).remove();
  }

  if (object.offer.features.length !== 0) {
    for (let item of window.util.FEATURES) {
      if (!object.offer.features.includes(item)) {
        card.querySelector(`.popup__feature--${item}`).remove();
      }
    }
  } else {
    card.querySelector(`.popup__features`).remove();
  }

  if (object.offer.descriptions !== ``) {
    card.querySelector(`.popup__description`).textContent = object.offer.description;
  } else {
    card.querySelector(`.popup__description`).remove();
  }

  if (object.offer.photos.length !== 0) {
    card.querySelector(`.popup__photo`).src = object.offer.photos[0];
    let cardPopupPhotos = card.querySelector(`.popup__photos`);
    for (let i = 1; i < object.offer.photos.length; i++) {
      cardPopupPhotos.insertAdjacentHTML(`beforeend`, `<img src=${object.offer.photos[i]} class=popup__photo width=45 height=40 alt="Фотография жилья" >`);
    }
  } else {
    card.querySelector(`.popup__photos`).remove();
  }
  if (object.author.avatar !== ``) {
    card.querySelector(`.popup__avatar`).src = object.author.avatar;
  } else {
    card.querySelector(`.popup__avatar`).remove();
  }

  return card;
};

const activateCards = (arr) => {
  let fragment = document.createDocumentFragment();
  arr.forEach((item) => fragment.appendChild(renderCard(item)));
  window.elements.map.insertBefore(fragment, window.elements.mapFilterFormContainer);
  window.pin.showObjectCard();
};

window.card = {
  activateCards
};
