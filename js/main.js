"use strict";

(function () {
  window.form.disabledForm(window.elements.formFieldsets);
  window.form.disabledForm(window.elements.mapFiltersSelects);

  window.form.updateAddressValue();
  window.elements.addressInput.setAttribute(`readonly`, ``);
  window.elements.form.addEventListener(`change`, window.form.formHandler);

  window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMouseDownPress);
  window.elements.mapPinMain.addEventListener(`keydown`, window.map.onEnterPress);

  window.elements.mapPinMain.addEventListener(`mousedown`, window.move.onMouseDown);
})();

