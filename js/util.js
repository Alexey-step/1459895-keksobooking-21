"use strict";

(() => {

  const MAX_PRICE = 1000000;
  const MAX_ROOM = 100;
  const MIN_GUESTS = 0;
  const MAX_LENGTH_VALUE = 100;
  const MIN_LENGTH_VALUE = 30;
  const MIN_PRICES = [0, 1000, 5000, 10000];

  const Code = {
    SUCCESS: 200,
    CACHED: 302,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  const MapSizes = {
    MAP_MIN_WIDTH: 0,
    MAP_MAX_WIDTH: 1200,
    MAP_MIN_HEIGTH: 130,
    MAP_MAX_HEIGHT: 630
  };

  const MapMainPinSize = {
    HEIGHT: 65,
    WIDTH: 65,
    MAX_HEIGHT: 87
  };

  const PinCoords = {
    MIN_Y: MapSizes.MAP_MIN_HEIGTH - MapMainPinSize.MAX_HEIGHT,
    MAX_Y: MapSizes.MAP_MAX_HEIGHT - MapMainPinSize.MAX_HEIGHT,
    MIN_X: MapSizes.MAP_MIN_WIDTH - MapMainPinSize.WIDTH / 2,
    MAX_X: MapSizes.MAP_MAX_WIDTH - MapMainPinSize.WIDTH / 2
  };

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

  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const MainPinStartCoordinates = {
    X: 570,
    Y: 375
  };

  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const MAX_PIN_COUNT = 5;

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; text-align: center; background-color: white; border: 2px solid red; color: red; max-width: 400px; min-height: 130px; display: flex; align-items: center; border-radius: 20px;`;
    node.style.position = `fixed`;
    node.style.top = `30%`;
    node.style.left = `34%`;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const showSuccessMessage = () => {
    const success = window.elements.main.querySelector(`.success`);
    success.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`click`, onSuccessMessageClick);
  };

  const showErrorMessage = () => {
    const errorButton = window.elements.main.querySelector(`.error__button`);
    const error = window.elements.main.querySelector(`.error`);
    error.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`click`, onErrorMessageClick);
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const onSuccessMessageEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hiddenSuccessMessage();
    }
  };

  const onSuccessMessageClick = (evt) => {
    evt.preventDefault();
    hiddenSuccessMessage();
  };

  const hiddenSuccessMessage = () => {
    const success = window.elements.main.querySelector(`.success`);
    success.classList.add(`hidden`);
    document.removeEventListener(`click`, onSuccessMessageClick);
    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
  };

  const onErrorMessageEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hiddenErrorMessage();
    }
  };

  const onErrorMessageClick = (evt) => {
    evt.preventDefault();
    hiddenErrorMessage();
  };

  const onErrorButtonClick = (evt) => {
    evt.preventDefault();
    hiddenErrorMessage();
  };

  const hiddenErrorMessage = () => {
    const errorButton = window.elements.main.querySelector(`.error__button`);
    const error = window.elements.main.querySelector(`.error`);
    error.classList.add(`hidden`);
    document.removeEventListener(`click`, onErrorMessageClick);
    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    errorButton.removeEventListener(`click`, onErrorButtonClick);
  };

  const filterArray = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hasOwnProperty(`offer`)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  window.util = {
    MAX_PRICE,
    MAP_SIZES: MapSizes,
    PIN_COORDS: PinCoords,
    MAX_ROOM,
    MIN_GUESTS,
    CODE: Code,
    MAX_LENGTH_VALUE,
    MIN_LENGTH_VALUE,
    MIN_PRICES,
    MAP_MAIN_PIN_SIZE: MapMainPinSize,
    PIN_SIZES: PinSizes,
    COORDINATES: Coordinates,
    FEATURES,
    URL,
    MAX_PIN_COUNT,
    MAIN_PIN_START_COORDINATES: MainPinStartCoordinates,
    errorHandler,
    showSuccessMessage,
    showErrorMessage,
    filterArray
  };
})();
