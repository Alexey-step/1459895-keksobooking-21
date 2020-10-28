"use strict";

const loadPreview = (element, onLoad) => {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.util.FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      onLoad(reader.result);
    });

    reader.readAsDataURL(file);
  }
};

const onHousingPreviewLoad = (result) => {
  if (window.elements.housingPreview.children) {
    window.elements.housingPreview.innerHTML = ``;
    window.elements.housingPreview.insertAdjacentHTML(`beforeend`, `<img src=${result} width=45 height=40 alt="Фотография жилья" >`);
  }
};

const onAvatarPreviewLoad = (result) => {
  window.elements.avatarPreview.src = result;
};

window.preview = {
  onHousingPreviewLoad,
  loadPreview,
  onAvatarPreviewLoad
};
