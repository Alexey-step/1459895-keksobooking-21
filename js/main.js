"use strict";

window.form.disabledForm(window.elements.formFieldsets);
window.form.disabledForm(window.elements.mapFiltersSelects);

window.form.updateAddressValue();
window.elements.addressInput.setAttribute(`readonly`, ``);
window.elements.form.addEventListener(`change`, window.form.formHandler);

window.elements.mapPinMain.addEventListener(`mousedown`, window.map.onMouseDownPress);
window.elements.mapPinMain.addEventListener(`keydown`, window.map.onEnterPress);

window.elements.mapPinMain.addEventListener(`mousedown`, window.move.onMouseDown);

window.elements.form.addEventListener(`submit`, window.form.onFormSubmit);

window.elements.formReset.addEventListener(`keydown`, window.form.onFormResetEnterPress);
window.elements.formReset.addEventListener(`click`, window.form.onFormResetClick);

window.elements.mapFilters.addEventListener(`change`, window.debounce(window.filter.mapFormHandler));

window.message.filingErrorBlock();
window.message.filingSuccessBlock();
