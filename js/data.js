"use strict";

(function () {
  const createObject = () => {
    let coordinateX = window.util.getRandomInteger(window.util.COORDINATES.MIN_X, window.util.COORDINATES.MAX_X);
    let coordinateY = window.util.getRandomInteger(window.util.COORDINATES.MIN_Y, window.util.COORDINATES.MAX_Y);
    let oneObj = {
      "author": {
        "avatar": `img/avatars/user0${window.util.getUniqueItem(window.util.NUMBERS)}.png`
      },
      "offer": {
        "title": window.util.getUniqueItem(window.util.TITLES),
        "address": `${coordinateX}, ${coordinateY}`,
        "price": window.util.getRandomInteger(window.util.PRICES.MIN, window.util.PRICES.MAX),
        "type": window.util.getRandomElement(window.util.TYPE),
        "rooms": window.util.getRandomElement(window.util.createRandomNumbers(4)),
        "guests": window.util.getRandomElement(window.util.createRandomNumbers(6)),
        "checkin": window.util.getRandomElement(window.util.TIME),
        "checkout": window.util.getRandomElement(window.util.TIME),
        "features": window.util.createRandomArray(window.util.FEATURES),
        "descriptions": window.util.getUniqueItem(window.util.DESCRIPTIONS),
        "photos": window.util.createRandomArray(window.util.PHOTOS)
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

  window.data = {
    objects: createArrayOfObjects(8)
  };
})();
