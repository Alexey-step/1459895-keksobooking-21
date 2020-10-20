"use strict";

(() => {

  const load = (onSuccess, onError, url) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = 10000;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case window.util.CODE.SUCCESS:
          onSuccess(xhr.response);
          break;

        case window.util.CODE.CACHED:
          error = `Неверный запрос`;
          break;

        case window.util.CODE.NOT_FOUND_ERROR:
          error = `Ничего не найдено`;
          break;

        case window.util.CODE.SERVER_ERROR:
          error = `Ошибка сервера`;
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполнится за ${xhr.timeout}мс`);
    });

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.load = load;

})();
