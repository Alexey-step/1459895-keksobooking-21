"use strict";

(function () {

  const URL = `https://javascript.pages.academy/keksobooking`;


  const upload = (data, onSuccess) => {
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

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = upload;

})();
