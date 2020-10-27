"use strict";

window.form.disabledForm(window.elements.formFieldsets);
window.form.disabledForm(window.elements.mapFilterFormSelects);

window.form.updateAddressValue();
window.elements.addressInput.setAttribute(`readonly`, ``);
window.elements.form.addEventListener(`change`, window.form.onFormChange);

window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMapPinMainMouseDownPress);
window.elements.mapPinMain.addEventListener(`keydown`, window.map.onMapPinMainEnterPress);

window.elements.mapPinMain.addEventListener(`mousedown`, window.move.onMouseDown);

window.elements.form.addEventListener(`submit`, window.form.onFormSubmit);

window.elements.formResetButton.addEventListener(`keydown`, window.form.onFormResetButtonEnterPress);
window.elements.formResetButton.addEventListener(`click`, window.form.onFormResetButtonClick);

window.elements.mapFilterForm.addEventListener(`change`, window.debounce(window.filter.onMapFilterFormChange));

window.message.filingErrorBlock();
window.message.filingSuccessBlock();
