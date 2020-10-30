"use strict";

const OfferType = {
  palace: `дворец`,
  flat: `квартира`,
  house: `дом`,
  bungalow: `бунгало`
};

const createCapacityString = (item) => {
  let lastRoomNumber = +item.offer.rooms.toString().slice(-1);
  let lastGuestsNumber = +item.offer.guests.toString().slice(-1);
  let guestString = ``;
  let roomsString = ``;
  if (lastRoomNumber > 4 && lastRoomNumber <= 9 || lastRoomNumber === 0) {
    roomsString = `${lastRoomNumber} комнат для `;
  }
  if (lastRoomNumber >= 2 && lastRoomNumber <= 4) {
    roomsString = `${lastRoomNumber} комнаты для `;
  }
  if (lastRoomNumber === 1) {
    roomsString = `${lastRoomNumber} комната для `;
  }
  if (lastGuestsNumber === 1) {
    guestString = `${lastGuestsNumber} гостя`;
  } else {
    guestString = `${lastGuestsNumber} гостей`;
  }
  return roomsString + guestString;
};

const renderCard = (item) => {
  let card = window.elements.cardTemplate.cloneNode(true);

  if (item.offer.rooms !== 0 && item.offer.guests !== 0) {
    card.querySelector(`.popup__text--capacity`).textContent = createCapacityString(item);
  } else {
    card.querySelector(`.popup__text--capacity`).remove();
  }

  card.querySelector(`.popup__title`).textContent = item.offer.title;

  if (item.offer.address !== ``) {
    card.querySelector(`.popup__text--address`).textContent = item.offer.address;
  } else {
    card.querySelector(`.popup__text--address`).remove();
  }

  if (item.offer.price !== undefined) {
    card.querySelector(`.popup__text--price`).textContent = item.offer.price + `₽/ночь`;
  } else {
    card.querySelector(`.popup__text--price`).remove();
  }

  if (item.offer.type !== ``) {
    card.querySelector(`.popup__type`).textContent = OfferType[item.offer.type];
  } else {
    card.querySelector(`.popup__type`).remove();
  }

  if (item.offer.checkin !== undefined && item.offer.checkout !== undefined) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  } else {
    card.querySelector(`.popup__text--time`).remove();
  }

  if (item.offer.features.length !== 0) {
    for (let element of window.util.FEATURES) {
      if (!item.offer.features.includes(element)) {
        card.querySelector(`.popup__feature--${element}`).remove();
      }
    }
  } else {
    card.querySelector(`.popup__features`).remove();
  }

  if (item.offer.description !== ``) {
    card.querySelector(`.popup__description`).textContent = item.offer.description;
  } else {
    card.querySelector(`.popup__description`).remove();
  }

  if (item.offer.photos.length !== 0) {
    card.querySelector(`.popup__photo`).src = item.offer.photos[0];
    let cardPopupPhotos = card.querySelector(`.popup__photos`);
    for (let i = 1; i < item.offer.photos.length; i++) {
      cardPopupPhotos.insertAdjacentHTML(`beforeend`, `<img src=${item.offer.photos[i]} class=popup__photo width=45 height=40 alt="Фотография жилья" >`);
    }
  } else {
    card.querySelector(`.popup__photos`).remove();
  }
  if (item.author.avatar !== ``) {
    card.querySelector(`.popup__avatar`).src = item.author.avatar;
  } else {
    card.querySelector(`.popup__avatar`).remove();
  }

  return card;
};

const activateCards = (items) => {
  let fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(renderCard(item)));
  window.elements.map.insertBefore(fragment, window.elements.mapFilterFormContainer);
  window.pin.initCardPopup();
};

const removeCards = () => {
  const mapCards = window.elements.map.querySelectorAll(`.map__card`);
  mapCards.forEach((card) => card.remove());
};

window.card = {
  activateCards,
  removeCards
};
