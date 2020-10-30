"use strict";

window.map.deactivateMap();
window.elements.form.addEventListener(`change`, window.form.onFormChange);

window.elements.mapPinMain.addEventListener(`mousedown`, window.move.onMouseDown);

window.elements.form.addEventListener(`submit`, window.form.onFormSubmit);

window.elements.formResetButton.addEventListener(`keydown`, window.form.onFormResetButtonEnterPress);
window.elements.formResetButton.addEventListener(`click`, window.form.onFormResetButtonClick);

window.elements.mapFilterForm.addEventListener(`change`, window.debounce(window.filter.onMapFilterFormChange));

window.message.createMessage(window.util.MESSAGE_ELEMENT.ERROR_WINDOW);
window.message.createMessage(window.util.MESSAGE_ELEMENT.SUCCESS_WINDOW);
