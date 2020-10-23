"use strict";

const avatarPreviewHandler = () => {
  const file = window.elements.fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.util.FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      window.elements.avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const housingPreviewHandler = () => {
  const file = window.elements.fileHousingChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.util.FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      window.elements.housingPreview.insertAdjacentHTML(`beforeend`, `<img src=${reader.result} width=45 height=40 alt="Фотография жилья" >`);
    });

    reader.readAsDataURL(file);
  }
};

window.preview = {
  avatarPreviewHandler,
  housingPreviewHandler
};
