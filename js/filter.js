"use strict";

let filteredData = [];
let type = window.util.MAP_FORM_START_VALUE;
let rooms = window.util.MAP_FORM_START_VALUE;
let guests = window.util.MAP_FORM_START_VALUE;
let features = [];
let price = window.util.MAP_FORM_START_VALUE;

const onSuccessLoad = (data) => {
  filteredData = window.util.filterDataArray(data);
  updatePins();
};

const updatePins = () => {
  let filterArr = filterArray(filteredData);
  window.pin.activateServerDownloads(filterArr);
};

const filterArray = (items) => {

  let length = 0;
  return items.filter((pin) => {
    if (length === 5) {
      return false;
    }
    let result = true;

    result = result && filterType(pin);
    result = result && filterPrice(pin);
    result = result && filterRooms(pin);
    result = result && filterGuests(pin);
    result = result && filterFeatures(pin);

    if (result) {
      length++;
    }
    return result;
  });
};

const filterType = (item) => {
  if (type === window.util.MAP_FORM_START_VALUE) {
    return true;
  }
  if (item.offer.type === type) {
    return true;
  }
  return false;
};

const filterPrice = (item) => {
  if (price === window.util.MAP_FORM_START_VALUE) {
    return true;
  }
  if (price === `middle` && item.offer.price >= window.util.FilterPrice.LOW && item.offer.price <= window.util.FilterPrice.HIGH) {
    return true;
  }
  if (price === `low` && item.offer.price < window.util.FilterPrice.LOW) {
    return true;
  }
  if (price === `high` && item.offer.price > window.util.FilterPrice.HIGH) {
    return true;
  }
  return false;
};

const filterRooms = (item) => {
  if (rooms === window.util.MAP_FORM_START_VALUE) {
    return true;
  }
  if (item.offer.rooms === parseInt(rooms, 10)) {
    return true;
  }
  return false;
};

const filterGuests = (item) => {
  if (guests === window.util.MAP_FORM_START_VALUE) {
    return true;
  }
  if (item.offer.guests === parseInt(guests, 10)) {
    return true;
  }
  return false;
};

const filterFeatures = (item) => {
  if (features.length < 1) {
    return true;
  }
  let count = 0;
  for (let i = 0; i < features.length; i++) {
    if (item.offer.features.includes(features[i])) {
      count++;
    }
  }
  if (count === features.length) {
    return true;
  }
  return false;
};

const onMapFilterFormChange = () => {
  type = window.elements.housingType.value;
  price = window.elements.housingPrice.value;
  rooms = window.elements.housingRooms.value;
  guests = window.elements.housingGuests.value;
  features = Array.from(window.elements.featuresInputs).filter((item) => item.checked).map((item) => item.value);
  window.pin.removePins();
  window.card.removeCards();
  window.pin.resetCurrent();
  updatePins();
};

window.filter = {
  onMapFilterFormChange,
  onSuccessLoad
};
