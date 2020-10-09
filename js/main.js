"use strict";

(function () {
  window.form.disabledForm(window.elements.formFieldsets);
  window.form.disabledForm(window.elements.mapFiltersSelects);

  window.elements.addressInput.value = window.form.getMainPinCoordinates();
  window.elements.addressInput.setAttribute(`readonly`, ``);
  window.elements.form.addEventListener(`change`, window.form.formHandler);

  window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMouseDownPress);
  window.elements.mapPinMain.addEventListener(`keydown`, window.map.onEnterPress);
})();
