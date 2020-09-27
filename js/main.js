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
  height: 65,
  width: 65
};

const COORDINATES = {
  minY: 130,
  maxY: 630,
  minX: 65,
  maxX: 1200
};

const getRandomNumbersArrays = (n) => {
  let arr = [];
  for (let i = 1; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

let map = document.querySelector(`.map`);
let fragment = document.createDocumentFragment();
let pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let mapPins = map.querySelector(`.map__pins`);

map.classList.remove(`map--faded`);

const getCoordinates = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandoms = (arrayTime) => {
  return arrayTime[Math.floor(Math.random() * arrayTime.length)];
};

const getRandomElements = (arr) => {
  let b = getRandoms(arr);
  arr.splice(arr.indexOf(b), 1);
  return b;
};

//  const getNumbers = (numbersArr) => {
//  let imgNumber = 0;
//  let img = ``;
//  imgNumber = getRandoms(numbersArr);
//  img = `img/avatars/user0${imgNumber}.png`;
//  imgNumber = numbersArr.indexOf(imgNumber);
//  numbersArr.splice(imgNumber, 1);
//  return img;
//  };

// const createRandomArray = (arr) => {
//  let features = [];
//  let cloneArr = [].concat(arr);
//  let featuresRandomLength = Math.floor(Math.random() * arr.length + 1);
//  while (features.length < featuresRandomLength) {
//    let randomSrting = getRandoms(cloneArr);
//    features.push(randomSrting);
//    randomSrting = cloneArr.indexOf(randomSrting);
//    cloneArr.splice(randomSrting, 1);
//  }
//  return features;
// };

const createRandomArray = (arr) => {
  let features = [];
  let cloneArr = [].concat(arr);
  let featuresRandomLength = Math.floor(Math.random() * arr.length + 1);
  while (features.length < featuresRandomLength) {
    features.push(getRandomElements(cloneArr));
  }
  return features;
};

const createObjects = () => {
  let oneObj = {
    "author": {
      "avatar": `img/avatars/user0${getRandomElements(NUMBERS)}.png`
    },
    "offer": {
      "title": getRandomElements(TITLES),
      "address": `600, 350`,
      "price": getCoordinates(PRICES.min, PRICES.max),
      "type": getRandoms(TYPE),
      "rooms": getRandoms(getRandomNumbersArrays(4)),
      "guests": getRandoms(getRandomNumbersArrays(6)),
      "checkin": getRandoms(TIME),
      "checkout": getRandoms(TIME),
      "features": createRandomArray(FEATURES),
      "descriptions": `asd`,
      "photos": createRandomArray(PHOTOS)
    },
    "location": {
      "x": getCoordinates(COORDINATES.minX, COORDINATES.maxX),
      "y": getCoordinates(COORDINATES.minY, COORDINATES.maxY)
    }
  };
  return oneObj;
};

const renderArrayOfObjects = (quantity) => {
  let objArray = [];
  let houseObj = {};
  for (let i = 0; i < quantity; i++) {
    houseObj[i] = createObjects();
    objArray.push(houseObj[i]);
  }
  return objArray;
};

let objectsArray = renderArrayOfObjects(8);

const renderMapPin = (object) => {
  let mapPin = pinTemplate.cloneNode(true);

  mapPin.querySelector(`img`).src = object.author.avatar;
  mapPin.querySelector(`img`).alt = object.offer.title;
  mapPin.style.left = (object.location.x - PIN_SIZES.width) + `px`;
  mapPin.style.top = (object.location.y - PIN_SIZES.height) + `px`;

  return mapPin;
};

const filingBlock = (arr, element) => {
  for (let i = 0; i < arr.length; i++) {
    element.appendChild(renderMapPin(arr[i]));
  }
  return element;
};


mapPins.appendChild(filingBlock(objectsArray, fragment));
