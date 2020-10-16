"use strict";

(function () {

  const activateMap = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.elements.form.classList.remove(`ad-form--disabled`);
    window.load(window.pin.activateServerDownloads, window.util.errorHandler, window.util.URL);
    window.elements.mapPinMain.removeEventListener(`mousedown`, onMouseDownPress);
    window.elements.mapPinMain.removeEventListener(`keydown`, onEnterPress);
  };

  const onMouseDownPress = (evt) => {
    if (evt.button === 0) {
      activateMap();
    }
  };

  const onEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activateMap();
    }
  };

  window.map = {
    onMouseDownPress,
    onEnterPress,
    activateMap
  };

})();
