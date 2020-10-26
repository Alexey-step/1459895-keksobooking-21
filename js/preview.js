"use strict";

const previewHandler = (element, successPreview) => {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.util.FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (window.elements.housingPreview.children.length < 1) {
        successPreview(reader.result);
      }
    });

    reader.readAsDataURL(file);
  }
};

const onLoadHousingPreview = (result) => {
  if (window.elements.housingPreview.children.length < 1) {
    window.elements.housingPreview.insertAdjacentHTML(`beforeend`, `<img src=${result} width=45 height=40 alt="Фотография жилья" >`);
  }
};

const onLoadAvatarPreview = (result) => {
  window.elements.avatarPreview.src = result;
};

window.preview = {
  onLoadHousingPreview,
  previewHandler,
  onLoadAvatarPreview
};
