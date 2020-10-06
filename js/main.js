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

const PinSizes = {
  HEIGHT: 70,
  WIDTH: 50
};

const Coordinates = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0,
  MAX_X: 1200
};

const MapMainPinSize = {
  HEIGHT: 65,
  WIDTH: 65,
  MAX_HEIGHT: 87
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
  let coordinateX = getRandomInteger(Coordinates.MIN_X, Coordinates.MAX_X);
  let coordinateY = getRandomInteger(Coordinates.MIN_Y, Coordinates.MAX_Y);
  let oneObj = {
    "author": {
      "avatar": `img/avatars/user0${getUniqueItem(NUMBERS)}.png`
    },
    "offer": {
      "title": getUniqueItem(TITLES),
      "address": `${coordinateX}, ${coordinateY}`,
      "price": getRandomInteger(Prices.MIN, Prices.MAX),
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
  mapPin.style.left = (object.location.x - (PinSizes.WIDTH / 2)) + `px`;
  mapPin.style.top = (object.location.y - PinSizes.HEIGHT) + `px`;

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
  return fragment;
};

const getMainPinCoordinates = () => {
  let mapPinMainX = mapPinMain.style.left.replace(/[^\d.-]/g, ``);
  let mapPinMainY = mapPinMain.style.top.replace(/[^\d.-]/g, ``);
  let coordinates;
  if (map.classList.contains(`map--faded`)) {
    coordinates = `${Math.floor(+mapPinMainX + MapMainPinSize.WIDTH / 2)}, ${Math.floor(+mapPinMainY + MapMainPinSize.HEIGHT / 2)}`;
  } else {
    coordinates = `${Math.floor(+mapPinMainX + MapMainPinSize.WIDTH / 2)}, ${Math.floor(+mapPinMainY + MapMainPinSize.MAX_HEIGHT)}`;
  }
  return coordinates;
};

const disabledForm = (element) => {
  for (let item of element) {
    item.setAttribute(`disabled`, `disabled`);
  }
};

const enableForm = (element) => {
  for (let item of element) {
    item.removeAttribute(`disabled`);
  }
};

const hidePins = (element) => {
  for (let item of element) {
    if (!item.classList.contains(`map__pin--main`)) {
      item.style.display = `none`;
    }
  }
};

const showPins = (element) => {
  for (let item of element) {
    if (!item.classList.contains(`map__pin--main`)) {
      item.style.display = `block`;
    }
  }
};

const activateMap = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  enableForm(formFieldsets);
  enableForm(mapFiltersSelects);
  showPins(pins);
  addressInput.value = getMainPinCoordinates();
  showObjectCard();
};

const hideCards = (items) => {
  for (let item of items) {
    item.style.display = `none`;
  }
};

const openPopup = (pin, card) => {
  for (let i = 0; i < pin.length; i++) {
    if (!pin[i].classList.contains(`map__pin--main`)) {
      pin[i].addEventListener(`click`, () => {
        hideCards(card);
        card[i - 1].style.display = `block`;
      });
      pin[i].addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          hideCards(card);
          card[i - 1].style.display = `block`;
        }
      });
    }
  }
};

const showObjectCard = () => {
  const popupsClose = document.querySelectorAll(`.popup__close`);
  openPopup(pins, mapCard);
  closePopup(popupsClose, mapCard);
};

const closePopup = (closeButton, card) => {
  for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener(`click`, () => {
      card[i].style.display = `none`;
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        card[i].style.display = `none`;
      }
    });
  }
};

const chekValidGuestsSelector = (room, guests) => {
  room = +room;
  guests = +guests;
  const MAX_ROOM = 100;
  const MIN_GUESTS = 0;
  if (room === MAX_ROOM && guests !== MIN_GUESTS) {
    return false;
  }
  if (guests > room) {
    return false;
  }
  if (room < MAX_ROOM && guests === MIN_GUESTS) {
    return false;
  }
  return true;
};

const showError = () => {
  const room = roomsNumber.value;
  if (room === `1`) {
    guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${room} гостя`);
  } else if (room === `100`) {
    guestsNumber.setCustomValidity(`Это размещение не для гостей`);
  } else {
    guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${room} гостей`);
  }

  roomsNumber.reportValidity();
  guestsNumber.reportValidity();
};

const clearError = () => {
  roomsNumber.setCustomValidity(``);
  guestsNumber.setCustomValidity(``);
};

const formHandler = (evt) => {
  if (evt.target === roomsNumber || evt.target === guestsNumber) {
    const roomNumberVal = roomsNumber.value;
    const guestsNumberVal = guestsNumber.value;
    const valid = chekValidGuestsSelector(roomNumberVal, guestsNumberVal);
    if (!valid) {
      showError();
    } else {
      clearError();
    }
    return;
  }
  if (evt.target === formTitleInput) {
    chekValidTitle();
  }
  if (evt.target === formPrice || evt.target === formType) {
    const MIN_PRICES = [0, 1000, 5000, 10000];
    checkValidPrice(MIN_PRICES, formType);
  }
  if (evt.target === formTimeIn) {
    syncTime(formTimeIn, formTimeOut);
  }
  if (evt.target === formTimeOut) {
    syncTime(formTimeOut, formTimeIn);
  }
};

const syncTime = (time1, time2) => {
  time2.selectedIndex = time1.selectedIndex;
};

const checkValidPrice = (price, type) => {
  let inputPrice = parseInt(formPrice.value, 10);
  const MAX_PRICE = 1000000;
  for (let i = 0; i < type.length; i++) {
    if (type[i].selected) {
      formPrice.placeholder = price[i];
      if (inputPrice < price[i]) {
        formPrice.setCustomValidity(`Минимальная цена для данного размещения ${price[i]}`);
      } else if (inputPrice > MAX_PRICE) {
        formPrice.setCustomValidity(`Максимально возможное значение ${MAX_PRICE}`);
      } else {
        formPrice.setCustomValidity(``);
      }
      formPrice.reportValidity();
    }
  }
};

const chekValidTitle = () => {
  const MAX_LENGTH_VALUE = 100;
  const MIN_LENGTH_VALUE = 30;
  let inputValueLength = formTitleInput.value.length;
  if (inputValueLength < MIN_LENGTH_VALUE) {
    formTitleInput.setCustomValidity(`Слишком коротко, минимальная длинна заголовка ${MIN_LENGTH_VALUE} симв, допишите еще ${MIN_LENGTH_VALUE - inputValueLength} симв.`);
  } else if (inputValueLength > MAX_LENGTH_VALUE) {
    formTitleInput.setCustomValidity(`Слишком длинное название, максимальная длинна ${MAX_LENGTH_VALUE} симв., уберите лишние ${inputValueLength - MAX_LENGTH_VALUE} симв.`);
  } else {
    formTitleInput.setCustomValidity(``);
  }

  formTitleInput.reportValidity();
};

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const form = document.querySelector(`.ad-form`);
const roomsNumber = form.querySelector(`#room_number`);
const guestsNumber = form.querySelector(`#capacity`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
const addressInput = form.querySelector(`#address`);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
const formTitleInput = form.querySelector(`#title`);
const formPrice = form.querySelector(`#price`);
const formType = form.querySelector(`#type`);
const formTimeIn = form.querySelector(`#timein`);
const formTimeOut = form.querySelector(`#timeout`);

addressInput.value = getMainPinCoordinates();
addressInput.setAttribute(`readonly`, ``);
const objectsArray = createArrayOfObjects(8);
mapPins.appendChild(filingBlock(objectsArray));
const pins = map.querySelectorAll(`.map__pin`);
hidePins(pins);
map.insertBefore(filingCards(objectsArray), mapFiltersContainer);
const mapCard = document.querySelectorAll(`.map__card`);
hideCards(mapCard);

disabledForm(formFieldsets);
disabledForm(mapFiltersSelects);

form.addEventListener(`change`, formHandler);

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activateMap();
  }
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activateMap();
  }
});
