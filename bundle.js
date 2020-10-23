(()=>{"use strict";(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins"),o=e.querySelector(".map__pin--main"),n=e.querySelector(".map__filters-container"),r=n.querySelector(".map__filters"),i=r.querySelectorAll("select"),s=document.querySelector(".ad-form"),l=s.querySelectorAll("fieldset"),d=s.querySelector("#room_number"),a=s.querySelector("#capacity"),w=s.querySelector("#title"),m=s.querySelector("#price"),u=s.querySelector("#type"),c=s.querySelector("#timein"),p=s.querySelector("#timeout"),f=s.querySelector("#address"),_=document.querySelector("#card").content.querySelector(".map__card"),y=document.querySelector("#pin").content.querySelector(".map__pin"),v=s.querySelector(".ad-form__reset"),E=document.querySelector("#success").content.querySelector(".success"),S=document.querySelector("#error").content.querySelector(".error"),I=document.querySelector("main"),M=r.querySelector("#housing-type"),h=r.querySelector("#housing-price"),g=r.querySelector("#housing-rooms"),A=r.querySelector("#housing-guests"),P=r.querySelectorAll('input[name="features"]'),T=s.querySelector(".ad-form-header__input"),N=s.querySelector(".ad-form-header__preview img"),L=s.querySelector(".ad-form__input"),C=s.querySelector(".ad-form__photo");window.elements={form:s,roomsNumber:d,guestsNumber:a,formTitleInput:w,formPrice:m,formType:u,formTimeIn:c,formTimeOut:p,addressInput:f,map:e,mapPins:t,mapPinMain:o,mapFilters:r,mapFiltersContainer:n,mapFiltersSelects:i,formFieldsets:l,cardTemplate:_,pinTemplate:y,formResetButton:v,successTemplate:E,errorTemplate:S,main:I,housingType:M,housingPrice:h,housingRooms:g,housingGuests:A,featuresInputs:P,fileAvatarChooser:T,avatarPreview:N,fileHousingChooser:L,housingPreview:C}})(),(()=>{const e={MAP_MIN_WIDTH:0,MAP_MAX_WIDTH:1200,MAP_MIN_HEIGTH:130,MAP_MAX_HEIGHT:630},t={HEIGHT:65,WIDTH:65,MAX_HEIGHT:87},o={MIN_Y:e.MAP_MIN_HEIGTH-t.MAX_HEIGHT,MAX_Y:e.MAP_MAX_HEIGHT-t.MAX_HEIGHT,MIN_X:e.MAP_MIN_WIDTH-t.WIDTH/2,MAX_X:e.MAP_MAX_WIDTH-t.WIDTH/2},n=e=>{"Escape"===e.key&&(e.preventDefault(),i())},r=e=>{e.preventDefault(),i()},i=()=>{window.elements.main.querySelector(".success").classList.add("hidden"),document.removeEventListener("click",r),document.removeEventListener("keydown",n)},s=e=>{"Escape"===e.key&&(e.preventDefault(),a())},l=e=>{e.preventDefault(),a()},d=e=>{e.preventDefault(),a()},a=()=>{const e=window.elements.main.querySelector(".error__button");window.elements.main.querySelector(".error").classList.add("hidden"),document.removeEventListener("click",l),document.removeEventListener("keydown",s),e.removeEventListener("click",d)};window.util={MAX_PRICE:1e6,MAP_SIZES:e,PIN_COORDS:o,MAX_ROOM:100,MIN_GUESTS:0,CODE:{SUCCESS:200,CACHED:302,NOT_FOUND_ERROR:404,SERVER_ERROR:500},MAX_LENGTH_VALUE:100,MIN_LENGTH_VALUE:30,MIN_PRICES:[0,1e3,5e3,1e4],MAP_MAIN_PIN_SIZE:t,PIN_SIZES:{HEIGHT:70,WIDTH:50},COORDINATES:{MIN_Y:130,MAX_Y:630,MIN_X:0,MAX_X:1200},FEATURES:["wifi","dishwasher","parking","washer","elevator","conditioner"],URL_LOAD:"https://21.javascript.pages.academy/keksobooking/data",MAX_PIN_COUNT:5,MAIN_PIN_START_COORDINATES:{X:570,Y:375},FilterPrice:{LOW:1e4,HIGH:5e4},FILE_TYPES:["gif","jpg","jpeg","png"],errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; text-align: center; background-color: white; border: 2px solid red; color: red; max-width: 400px; min-height: 130px; display: flex; align-items: center; border-radius: 20px;",t.style.position="fixed",t.style.top="30%",t.style.left="34%",t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},showSuccessMessage:()=>{window.elements.main.querySelector(".success").classList.remove("hidden"),document.addEventListener("keydown",n),document.addEventListener("click",r)},showErrorMessage:()=>{const e=window.elements.main.querySelector(".error__button");window.elements.main.querySelector(".error").classList.remove("hidden"),document.addEventListener("keydown",s),document.addEventListener("click",l),e.addEventListener("click",d)},filterArray:e=>{let t=[];for(let o=0;o<e.length;o++)e[o].hasOwnProperty("offer")&&t.push(e[o]);return t}}})(),window.debounce=function(e){let t=null;return function(...o){t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},window.message={filingErrorBlock:()=>{const e=window.elements.errorTemplate.cloneNode(!0);let t=document.createDocumentFragment();t.appendChild(e),window.elements.main.appendChild(t),window.elements.main.querySelector(".error").classList.add("hidden")},filingSuccessBlock:()=>{const e=window.elements.successTemplate.cloneNode(!0);let t=document.createDocumentFragment();t.appendChild(e),window.elements.main.appendChild(t),window.elements.main.querySelector(".success").classList.add("hidden")}},window.load=(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.timeout=1e4,n.addEventListener("load",(()=>{let o;switch(n.status){case window.util.CODE.SUCCESS:e(n.response);break;case window.util.CODE.CACHED:o="Неверный запрос";break;case window.util.CODE.NOT_FOUND_ERROR:o="Ничего не найдено";break;case window.util.CODE.SERVER_ERROR:o="Ошибка сервера";break;default:o=`Статус ответа: ${n.status} ${n.statusText}`}o&&t(o)})),n.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{t(`Запрос не успел выполнится за ${n.timeout}мс`)})),n.open("GET",o),n.send()},(()=>{let e=null;const t=t=>{t.style.display="block",e=t,document.addEventListener("keydown",r)},o=t=>{t.style.display="none",e=null,document.removeEventListener("keydown",r)};let n=0;const r=t=>{"Escape"===t.key&&(t.preventDefault(),o(e))};window.pin={resetCurrent:()=>{n=0,e=null},activateServerDownloads:e=>{(e=>{let t=document.createDocumentFragment();e.forEach((e=>t.appendChild((e=>{let t=window.elements.pinTemplate.cloneNode(!0);return t.querySelector("img").src=e.author.avatar,t.querySelector("img").alt=e.offer.title,t.style.left=e.location.x-window.util.PIN_SIZES.WIDTH/2+"px",t.style.top=e.location.y-window.util.PIN_SIZES.HEIGHT+"px",t})(e)))),window.elements.mapPins.appendChild(t)})(e),window.card.activateCards(e),window.form.enableForm(window.elements.formFieldsets),window.form.enableForm(window.elements.mapFiltersSelects)},showObjectCard:()=>{const r=document.querySelectorAll(".popup__close"),i=(e=>{let t=[];for(let o=0;o<e.length;o++)e[o].classList.contains("map__pin--main")||t.push(e[o]);return t})(window.elements.map.querySelectorAll(".map__pin")),s=document.querySelectorAll(".map__card");(e=>{for(let t of e)t.style.display="none"})(s),((r,i)=>{for(let s=0;s<r.length;s++)r[s].addEventListener("click",(()=>{e&&(r[n].classList.remove("map__pin--active"),o(e)),r[s].classList.add("map__pin--active"),t(i[s]),n=s})),r[s].addEventListener("keydown",(n=>{"Enter"===n.key&&(e&&o(e),t(i[s]))}))})(i,s),((e,t)=>{for(let n=0;n<e.length;n++)e[n].addEventListener("click",(()=>{o(t[n])}))})(r,s)}}})(),(()=>{const e={palace:"дворец",flat:"квартира",house:"дом",bungalow:"бунгало"};window.card={activateCards:t=>{let o=document.createDocumentFragment();t.forEach((t=>o.appendChild((t=>{let o=window.elements.cardTemplate.cloneNode(!0);if(0!==t.offer.rooms&&0!==t.offer.guests?o.querySelector(".popup__text--capacity").textContent=(e=>{let t=1===e.offer.guests?e.offer.guests+" гостя":e.offer.guests+" гостей";return(1===e.offer.rooms?e.offer.rooms+" комната для ":e.offer.rooms+" комнаты для ")+t})(t):o.querySelector(".popup__text--capacity").remove(),o.querySelector(".popup__title").textContent=t.offer.title,""!==t.offer.address?o.querySelector(".popup__text--address").textContent=t.offer.address:o.querySelector(".popup__text--address").remove(),""!==t.offer.price?o.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь":o.querySelector(".popup__text--price").remove(),""!==t.offer.type?o.querySelector(".popup__type").textContent=e[t.offer.type]:o.querySelector(".popup__type").remove(),""!==t.offer.checkin&&""!==t.offer.checkout?o.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:o.querySelector(".popup__text--time").remove(),0!==t.offer.features.length)for(let e of window.util.FEATURES)t.offer.features.includes(e)||o.querySelector(".popup__feature--"+e).remove();else o.querySelector(".popup__features").remove();if(""!==t.offer.descriptions?o.querySelector(".popup__description").textContent=t.offer.description:o.querySelector(".popup__description").remove(),0!==t.offer.photos.length){o.querySelector(".popup__photo").src=t.offer.photos[0];let e=o.querySelector(".popup__photos");for(let o=1;o<t.offer.photos.length;o++)e.insertAdjacentHTML("beforeend",`<img src=${t.offer.photos[o]} class=popup__photo width=45 height=40 alt="Фотография жилья" >`)}else o.querySelector(".popup__photos").remove();return""!==t.author.avatar?o.querySelector(".popup__avatar").src=t.author.avatar:o.querySelector(".popup__avatar").remove(),o})(t)))),window.elements.map.insertBefore(o,window.elements.mapFiltersContainer),window.pin.showObjectCard()}}})(),(()=>{const e="any";let t=[],o=e,n=e,r=e,i=[],s=e;const l=()=>{let e=d(t);window.pin.activateServerDownloads(e)},d=e=>{let t=0;return e.filter((e=>{if(5===t)return!1;let o=!0;return o=o&&a(e),o=o&&w(e),o=o&&m(e),o=o&&u(e),o=o&&c(e),o&&t++,o}))},a=t=>o===e||t.offer.type===o,w=t=>s===e||"middle"===s&&t.offer.price>=window.util.FilterPrice.LOW&&t.offer.price<=window.util.FilterPrice.HIGH||"low"===s&&t.offer.price<window.util.FilterPrice.LOW||"high"===s&&t.offer.price>window.util.FilterPrice.HIGH,m=t=>n===e||t.offer.rooms===parseInt(n,10),u=t=>r===e||t.offer.guests===parseInt(r,10),c=e=>{if(i.length<1)return!0;let t=0;for(let o=0;o<i.length;o++)e.offer.features.includes(i[o])&&t++;return t===i.length};window.filter={mapFormHandler:()=>{o=window.elements.housingType.value,s=window.elements.housingPrice.value,n=window.elements.housingRooms.value,r=window.elements.housingGuests.value,i=Array.from(window.elements.featuresInputs).filter((e=>e.checked)).map((e=>e.value)),window.map.removePins(),window.map.removeCards(),window.pin.resetCurrent(),l()},successHandler:e=>{t=window.util.filterArray(e),l()}}})(),window.upload=(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{switch(n.status){case window.util.CODE.SUCCESS:t(n.response);break;default:window.util.showErrorMessage()}})),n.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)},window.preview={avatarPreviewHandler:()=>{const e=window.elements.fileAvatarChooser.files[0],t=e.name.toLowerCase();if(window.util.FILE_TYPES.some((e=>t.endsWith(e)))){const t=new FileReader;t.addEventListener("load",(()=>{window.elements.avatarPreview.src=t.result})),t.readAsDataURL(e)}},housingPreviewHandler:()=>{const e=window.elements.fileHousingChooser.files[0],t=e.name.toLowerCase();if(window.util.FILE_TYPES.some((e=>t.endsWith(e)))){const t=new FileReader;t.addEventListener("load",(()=>{window.elements.housingPreview.insertAdjacentHTML("beforeend",`<img src=${t.result} width=45 height=40 alt="Фотография жилья" >`)})),t.readAsDataURL(e)}}},(()=>{const e=(e,t)=>{t.selectedIndex=e.selectedIndex},t=()=>{window.elements.form.reset(),o(),n(),window.form.updateAddressValue()},o=()=>{window.elements.housingPreview.children.length>0&&(window.elements.housingPreview.innerHTML="")},n=()=>{"img/muffin-grey.svg"!==window.elements.avatarPreview.src&&(window.elements.avatarPreview.src="img/muffin-grey.svg")};window.form={getMainPinCoordinates:()=>{let e,t=window.elements.mapPinMain.style.left.replace(/[^\d.-]/g,""),o=window.elements.mapPinMain.style.top.replace(/[^\d.-]/g,"");return e=window.elements.map.classList.contains("map--faded")?`${Math.floor(+t+window.util.MAP_MAIN_PIN_SIZE.WIDTH/2)}, ${Math.floor(+o+window.util.MAP_MAIN_PIN_SIZE.HEIGHT/2)}`:`${Math.floor(+t+window.util.MAP_MAIN_PIN_SIZE.WIDTH/2)}, ${Math.floor(+o+window.util.MAP_MAIN_PIN_SIZE.MAX_HEIGHT)}`,e},formHandler:t=>{if(t.target===window.elements.roomsNumber||t.target===window.elements.guestsNumber){const e=window.elements.roomsNumber.value;return n=+(n=window.elements.guestsNumber.value),(o=+(o=e))===window.util.MAX_ROOM&&n!==window.util.MIN_GUESTS||n>o||o<window.util.MAX_ROOM&&n===window.util.MIN_GUESTS?(()=>{const e=window.elements.roomsNumber.value;"1"===e?window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${e} гостя`):"100"===e?window.elements.guestsNumber.setCustomValidity("Это размещение не для гостей"):window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${e} гостей`),window.elements.roomsNumber.reportValidity(),window.elements.guestsNumber.reportValidity()})():(window.elements.roomsNumber.setCustomValidity(""),void window.elements.guestsNumber.setCustomValidity(""))}var o,n;return t.target===window.elements.formTitleInput?(()=>{let e=window.elements.formTitleInput.value.length;e<window.util.MIN_LENGTH_VALUE?window.elements.formTitleInput.setCustomValidity(`Слишком коротко, минимальная длинна заголовка ${window.util.MIN_LENGTH_VALUE} симв, допишите еще ${window.util.MIN_LENGTH_VALUE-e} симв.`):e>window.util.MAX_LENGTH_VALUE?window.elements.formTitleInput.setCustomValidity(`Слишком длинное название, максимальная длинна ${window.util.MAX_LENGTH_VALUE} симв., уберите лишние ${e-window.util.MAX_LENGTH_VALUE} симв.`):window.elements.formTitleInput.setCustomValidity(""),window.elements.formTitleInput.reportValidity()})():t.target===window.elements.formPrice||t.target===window.elements.formType?((e,t)=>{let o=parseInt(window.elements.formPrice.value,10);window.elements.formPrice.placeholder=e[t.selectedIndex],o<e[t.selectedIndex]?window.elements.formPrice.setCustomValidity("Минимальная цена для данного размещения "+e[t.selectedIndex]):o>window.util.MAX_PRICE?window.elements.formPrice.setCustomValidity("Максимально возможное значение "+window.util.MAX_PRICE):window.elements.formPrice.setCustomValidity("")})(window.util.MIN_PRICES,window.elements.formType):t.target===window.elements.formTimeIn?e(window.elements.formTimeIn,window.elements.formTimeOut):t.target===window.elements.formTimeOut?e(window.elements.formTimeOut,window.elements.formTimeIn):t.target===window.elements.fileAvatarChooser?window.preview.avatarPreviewHandler():t.target!==window.elements.fileHousingChooser||window.preview.housingPreviewHandler()},enableForm:e=>{for(let t of e)t.removeAttribute("disabled")},disabledForm:e=>{for(let t of e)t.setAttribute("disabled","disabled")},updateAddressValue:()=>{window.elements.addressInput.value=window.form.getMainPinCoordinates()},onFormSubmit:e=>{window.upload(new FormData(window.elements.form),(()=>{window.map.deactivateMap(),window.elements.form.reset(),window.form.updateAddressValue(),window.util.showSuccessMessage()}),window.util.errorHandler),e.preventDefault()},onFormResetClick:e=>{e.preventDefault(),t()},onFormResetEnterPress:e=>{"Enter"===e.key&&(e.preventDefault(),t())}}})(),(()=>{const e=()=>{window.elements.map.classList.remove("map--faded"),window.elements.form.classList.remove("ad-form--disabled"),window.load(window.filter.successHandler,window.util.errorHandler,window.util.URL_LOAD),window.elements.mapPinMain.removeEventListener("mousedown",n),window.elements.mapPinMain.removeEventListener("keydown",r)},t=()=>{const e=window.elements.map.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t=0;t<e.length;t++)e[t].remove()},o=()=>{const e=window.elements.map.querySelectorAll(".map__card");for(let t=0;t<e.length;t++)e[t].remove()},n=t=>{0===t.button&&e()},r=t=>{"Enter"===t.key&&e()};window.map={onMouseDownPress:n,onEnterPress:r,activateMap:e,deactivateMap:()=>{window.elements.map.classList.add("map--faded"),window.elements.form.classList.add("ad-form--disabled"),window.form.disabledForm(window.elements.formFieldsets),window.form.disabledForm(window.elements.mapFiltersSelects),t(),o(),window.pin.resetCurrent(),window.elements.mapPinMain.style.left=window.util.MAIN_PIN_START_COORDINATES.X+"px",window.elements.mapPinMain.style.top=window.util.MAIN_PIN_START_COORDINATES.Y+"px",window.elements.mapPinMain.addEventListener("mousedown",window.map.onMouseDownPress),window.elements.mapPinMain.addEventListener("keydown",window.map.onEnterPress)},removePins:t,removeCards:o}})(),window.move={onMouseDown:e=>{e.preventDefault();const{left:t,top:o}=document.querySelector(".map").getBoundingClientRect(),n=e=>{e.preventDefault(),e.clientY-o-window.util.MAP_MAIN_PIN_SIZE.HEIGHT/2>window.util.PIN_COORDS.MIN_Y&&e.clientY-o-window.util.MAP_MAIN_PIN_SIZE.HEIGHT/2<window.util.PIN_COORDS.MAX_Y&&(window.elements.mapPinMain.style.top=e.clientY-o-window.util.MAP_MAIN_PIN_SIZE.HEIGHT/2+"px"),e.clientX-t-window.util.MAP_MAIN_PIN_SIZE.WIDTH/2<window.util.PIN_COORDS.MAX_X&&e.clientX-t-window.util.MAP_MAIN_PIN_SIZE.WIDTH/2>window.util.PIN_COORDS.MIN_X&&(window.elements.mapPinMain.style.left=e.clientX-t-window.util.MAP_MAIN_PIN_SIZE.WIDTH/2+"px"),window.form.updateAddressValue()},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r),window.form.updateAddressValue()};document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)}},window.form.disabledForm(window.elements.formFieldsets),window.form.disabledForm(window.elements.mapFiltersSelects),window.form.updateAddressValue(),window.elements.addressInput.setAttribute("readonly",""),window.elements.form.addEventListener("change",window.form.formHandler),window.elements.mapPinMain.addEventListener("mousedown",window.map.onMouseDownPress),window.elements.mapPinMain.addEventListener("keydown",window.map.onEnterPress),window.elements.mapPinMain.addEventListener("mousedown",window.move.onMouseDown),window.elements.form.addEventListener("submit",window.form.onFormSubmit),window.elements.formResetButton.addEventListener("keydown",window.form.onFormResetEnterPress),window.elements.formResetButton.addEventListener("click",window.form.onFormResetClick),window.elements.mapFilters.addEventListener("change",window.debounce(window.filter.mapFormHandler)),window.message.filingErrorBlock(),window.message.filingSuccessBlock()})();