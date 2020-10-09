"use strict";

(function () {

  const renderMapPin = (object) => {
    let mapPin = window.elements.pinTemplate.cloneNode(true);

    mapPin.querySelector(`img`).src = object.author.avatar;
    mapPin.querySelector(`img`).alt = object.offer.title;
    mapPin.style.left = (object.location.x - (window.util.PIN_SIZES.WIDTH / 2)) + `px`;
    mapPin.style.top = (object.location.y - window.util.PIN_SIZES.HEIGHT) + `px`;

    return mapPin;
  };

  const filingBlock = (arr) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderMapPin(arr[i]));
    }
    return fragment;
  };

  window.pin = {
    filingBlock
  };
})();
