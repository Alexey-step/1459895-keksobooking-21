"use strict";

(() => {

  const URL = `https://21.javascript.pages.academy/keksobooking`;


  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case window.util.CODE.SUCCESS:
          onSuccess(xhr.response);
          break;

        default:
          window.util.showErrorMessage();
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = upload;

})();
