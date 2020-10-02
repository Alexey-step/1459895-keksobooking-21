"use strict";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const TITLES = [
  `И снова Токио`,
  `И снова Берлин`,
  `И снова Лондон`,
  `И снова Нью-Йорк`,
  `И снова Вена`,
  `И снова Москва`,
  `И снова Рим`,
  `И снова Мадрид`
];

const PRICES = {
  min: 1000,
  max: 5000
};

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];

const PIN_SIZES = {
  height: 70,
  width: 50
};

const COORDINATES = {
  minY: 130,
  maxY: 630,
  minX: 0,
  maxX: 1200
};

const DESCRIPTIONS = [
  `Больше напоминает старую будку, но зато чисто`,
  `Отлиное расположение для любителей искусства, рядом расположена Кексогалерея и музей восковых фигур Мисье Кекса`,
  `Шикарные аппартаменты в самом центре кошачьего гетто`,
  `Люкс в центре города с видом на статую Великого Кекса`,
  `Простенькая комнатушка в кошачьей коммуналке`,
  `Шалаш на дереве в центральном парке города, отличное место для уединения с природой в шумном мегаполисе`,
  `Шикарный дворец для избранных котов, в котором каждый кот почувствует себя как король`,
  `Отличное бунгало на берегу океана, к вашим услугам всегда свежая рыба (если поймаете)`
];

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilters = map.querySelector(`.map__filters-container`);

const createRandomNumbers = (n) => {
  let arr = [];
  for (let i = 1; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getUniqueItem = (arr) => {
  let b = getRandomElement(arr);
  arr.splice(arr.indexOf(b), 1);
  return b;
};

const createRandomArray = (arr) => {
  let features = [];
  let cloneArr = [].concat(arr);
  let featuresRandomLength = Math.floor(Math.random() * arr.length + 1);
  while (features.length < featuresRandomLength) {
    features.push(getUniqueItem(cloneArr));
  }
  return features;
};

const createObject = () => {
  let coordinateX = getRandomInteger(COORDINATES.minX, COORDINATES.maxX);
  let coordinateY = getRandomInteger(COORDINATES.minY, COORDINATES.maxY);
  let oneObj = {
    "author": {
      "avatar": `img/avatars/user0${getUniqueItem(NUMBERS)}.png`
    },
    "offer": {
      "title": getUniqueItem(TITLES),
      "address": `${coordinateX}, ${coordinateY}`,
      "price": getRandomInteger(PRICES.min, PRICES.max),
      "type": getRandomElement(TYPE),
      "rooms": getRandomElement(createRandomNumbers(4)),
      "guests": getRandomElement(createRandomNumbers(6)),
      "checkin": getRandomElement(TIME),
      "checkout": getRandomElement(TIME),
      "features": createRandomArray(FEATURES),
      "descriptions": getUniqueItem(DESCRIPTIONS),
      "photos": createRandomArray(PHOTOS)
    },
    "location": {
      "x": coordinateX,
      "y": coordinateY
    }
  };
  return oneObj;
};

const createArrayOfObjects = (quantity) => {
  let objArray = [];
  for (let i = 0; i < quantity; i++) {
    objArray.push(createObject());
  }
  return objArray;
};

const renderMapPin = (object) => {
  let mapPin = pinTemplate.cloneNode(true);

  mapPin.querySelector(`img`).src = object.author.avatar;
  mapPin.querySelector(`img`).alt = object.offer.title;
  mapPin.style.left = (object.location.x - (PIN_SIZES.width / 2)) + `px`;
  mapPin.style.top = (object.location.y - PIN_SIZES.height) + `px`;

  return mapPin;
};

const renderCard = (object) => {
  let card = cardTemplate.cloneNode(true);
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
  for (let item of FEATURES) {
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


const filingBlock = (arr) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }
  return fragment;
};

const filingCards = (arr) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderCard(arr[i]));
  }
  return fragment.appendChild(renderCard(arr[0]));
};

const objectsArray = createArrayOfObjects(8);
mapPins.appendChild(filingBlock(objectsArray));
map.insertBefore(filingCards(objectsArray), mapFilters);
map.classList.remove(`map--faded`);
