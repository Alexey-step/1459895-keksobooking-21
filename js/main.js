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

const filingBlock = (arr) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }
  return fragment;
};

const objectsArray = createArrayOfObjects(8);
mapPins.appendChild(filingBlock(objectsArray));
map.classList.remove(`map--faded`);
