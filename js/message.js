"use strict";

const createMessage = (element) => {
  let fragment = document.createDocumentFragment();

  fragment.appendChild(element);
  window.elements.main.appendChild(fragment);
  element.classList.add(`hidden`);
};

window.message = {
  createMessage
};
