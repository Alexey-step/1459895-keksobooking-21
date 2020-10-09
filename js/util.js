"use strict";

(function () {

  const MAX_PRICE = 1000000;
  const MAX_ROOM = 100;
  const MIN_GUESTS = 0;
  const MAX_LENGTH_VALUE = 100;
  const MIN_LENGTH_VALUE = 30;
  const MIN_PRICES = [0, 1000, 5000, 10000];

  const MapMainPinSize = {
    HEIGHT: 65,
    WIDTH: 65,
    MAX_HEIGHT: 87
  };

  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

  const PinSizes = {
    HEIGHT: 70,
    WIDTH: 50
  };

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

  const Prices = {
    MIN: 1000,
    MAX: 5000
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

  const Coordinates = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: 1200
  };

  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

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

  window.util = {
    MAX_PRICE,
    MAX_ROOM,
    MIN_GUESTS,
    MAX_LENGTH_VALUE,
    MIN_LENGTH_VALUE,
    MIN_PRICES,
    MAP_MAIN_PIN_SIZE: MapMainPinSize,
    NUMBERS,
    PIN_SIZES: PinSizes,
    TITLES,
    PRICES: Prices,
    PHOTOS,
    TYPE,
    TIME,
    COORDINATES: Coordinates,
    FEATURES,
    DESCRIPTIONS,
    createRandomNumbers,
    getRandomInteger,
    getRandomElement,
    getUniqueItem,
    createRandomArray
  };
})();
