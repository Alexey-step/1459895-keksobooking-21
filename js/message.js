"use strict";

(() => {

  const filingErrorBlock = () => {
    const errorWindow = window.elements.errorTemplate.cloneNode(true);
    let fragment = document.createDocumentFragment();

    fragment.appendChild(errorWindow);
    window.elements.main.appendChild(fragment);
    const error = window.elements.main.querySelector(`.error`);
    error.classList.add(`hidden`);
  };

  const filingSuccessBlock = () => {
    const successWindow = window.elements.successTemplate.cloneNode(true);
    let fragment = document.createDocumentFragment();

    fragment.appendChild(successWindow);
    window.elements.main.appendChild(fragment);
    const success = window.elements.main.querySelector(`.success`);
    success.classList.add(`hidden`);
  };

  window.message = {
    filingErrorBlock,
    filingSuccessBlock
  };

})();
