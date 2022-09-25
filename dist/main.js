/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/api.js":
/*!***************************!*\
  !*** ./components/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"avatar\": () => (/* binding */ avatar),\n/* harmony export */   \"deleteCardFromServer\": () => (/* binding */ deleteCardFromServer),\n/* harmony export */   \"getAllData\": () => (/* binding */ getAllData),\n/* harmony export */   \"myId\": () => (/* binding */ myId),\n/* harmony export */   \"pushCard\": () => (/* binding */ pushCard),\n/* harmony export */   \"pushDataAvatar\": () => (/* binding */ pushDataAvatar),\n/* harmony export */   \"pushDataProfile\": () => (/* binding */ pushDataProfile),\n/* harmony export */   \"toggleLikeInServer\": () => (/* binding */ toggleLikeInServer)\n/* harmony export */ });\n/* harmony import */ var _modal_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal_window.js */ \"./components/modal_window.js\");\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.js */ \"./components/card.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nvar avatar = document.querySelector('.profile__image');\nvar myId = null;\n\nvar onResponce = function onResponce(res) {\n  return res.ok ? res.json() : Promise.reject(res);\n};\n\nfunction getData() {\n  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'\n    }\n  }).then(onResponce);\n} //получаю данные профиля с сервера\n\n\nfunction getCard() {\n  return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards ', {\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'\n    }\n  }).then(onResponce);\n} //получаю карточки с сервера\n\n\nfunction pushDataProfile(name, prof) {\n  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {\n    method: 'PATCH',\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      name: name,\n      about: prof\n    })\n  }).then(onResponce);\n} //отправляю данные профиля на сервер\n\n\nfunction pushDataAvatar(link) {\n  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {\n    method: 'PATCH',\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      avatar: link\n    })\n  }).then(onResponce);\n} //отправляю данные профиля на сервер\n\n\nfunction pushCard(cardLink, cardName) {\n  return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {\n    method: 'POST',\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      link: cardLink,\n      name: cardName\n    })\n  }).then(onResponce);\n}\n\nfunction deleteCardFromServer(id) {\n  return fetch(\"https://nomoreparties.co/v1/plus-cohort-15/cards/\".concat(id), {\n    method: 'DELETE',\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',\n      'Content-Type': 'application/json'\n    }\n  }).then(onResponce);\n}\n\nfunction toggleLikeInServer(id, isLike) {\n  return fetch(\"https://nomoreparties.co/v1/plus-cohort-15/cards/likes/\".concat(id), {\n    method: isLike ? 'DELETE' : 'PUT',\n    headers: {\n      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea',\n      'Content-Type': 'application/json'\n    }\n  }).then(onResponce);\n} //запрос на сервер удаление или нажатие лайка\n\n\nfunction getAllData() {\n  return Promise.all([getCard(), getData()]);\n}\n\ngetAllData().then(function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 2),\n      cards = _ref2[0],\n      data = _ref2[1];\n\n  _modal_window_js__WEBPACK_IMPORTED_MODULE_0__.profileName.textContent = data.name;\n  _modal_window_js__WEBPACK_IMPORTED_MODULE_0__.profession.textContent = data.about;\n  avatar.src = data.avatar;\n  myId = data._id;\n  cards.reverse().forEach(function (element) {\n    (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.addCard)(element, myId);\n  });\n});\n\n\n//# sourceURL=webpack://mesto-project/./components/api.js?");

/***/ }),

/***/ "./components/card.js":
/*!****************************!*\
  !*** ./components/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addCard\": () => (/* binding */ addCard),\n/* harmony export */   \"addNewCard\": () => (/* binding */ addNewCard),\n/* harmony export */   \"closeButton\": () => (/* binding */ closeButton),\n/* harmony export */   \"openImg\": () => (/* binding */ openImg),\n/* harmony export */   \"popupImage\": () => (/* binding */ popupImage)\n/* harmony export */ });\n/* harmony import */ var _modal_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal_window.js */ \"./components/modal_window.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./components/api.js\");\n\n // import {\n//   myId,\n// } from './../index.js'\n\nvar cardSection = document.querySelector(\".photo-grid\");\nvar cardTemplate = document.querySelector(\"#card-template\").content;\nvar popupImage = document.querySelector(\"#popupPhoto\");\nvar imgDescription = document.querySelector(\".popup__photo-title\");\nvar cardAddButton = _modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.querySelector(\".popup__submit\");\nvar img = document.querySelector(\".popup__photo\");\n\nfunction openButton(popup) {\n  popup.classList.add(\"popup_opened\");\n}\n\nfunction closeButton(popup) {\n  popup.classList.remove(\"popup_opened\");\n}\n\nvar handleLikeChangeStatus = function handleLikeChangeStatus(id, isLike, cardElement) {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.toggleLikeInServer)(id, isLike).then(function (data) {\n    updateLikeStatus(cardElement, data.likes, _api_js__WEBPACK_IMPORTED_MODULE_1__.myId);\n  }).catch(function (err) {\n    console.log(err);\n  });\n};\n\nfunction isLike(likeArr, myId) {\n  return Boolean(likeArr.find(function (element) {\n    return element._id === myId;\n  }));\n} // сравниваю id, проверяю есть ли лайк в массиве лайков\n\n\nfunction updateLikeStatus(cardElement, likeArr, myId) {\n  var likeButton = cardElement.querySelector(\".photo-grid__like\");\n  var likeCounter = cardElement.querySelector(\".photo-grid__like-counter\");\n  likeCounter.textContent = likeArr.length;\n\n  if (isLike(likeArr, myId)) {\n    likeButton.classList.add(\"photo-grid__like_active\");\n  } else {\n    likeButton.classList.remove(\"photo-grid__like_active\");\n  }\n}\n\nfunction addCard(data, myId) {\n  var card = createNewCard(data, myId, handleLikeChangeStatus, deleteCard);\n  cardSection.prepend(card);\n} //// функция добавления карточки из массива на страницу\n// function deleteCard(evt) {\n//   deleteCardFromServer(evt.parentElement.children[1].owner)\n//     .then(() => {\n//       evt.parentElement.remove();\n//       console.dir(evt.parentElement.children[1].owner)\n//     })\n//     .catch((err) => {\n//       console.log(err)\n//     })\n// }  // удаление карточки\n\n\nfunction deleteCard(card, cardId) {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.deleteCardFromServer)(cardId).then(function () {\n    card.remove();\n  }).catch(function (err) {\n    console.log(err);\n  });\n} // удаление карточки\n\n\nfunction createNewCard(data, myId, handleLikeChangeStatus, deleteCard) {\n  var cardElement = cardTemplate.cloneNode(true);\n  var likeButton = cardElement.querySelector(\".photo-grid__like\");\n  var card = cardElement.querySelector(\".photo-grid__item\");\n  var deleteButton = cardElement.querySelector('.photo-grid__del-button');\n  cardElement.querySelector(\".photo-grid__picture\").owner = \"\".concat(data._id);\n  cardElement.querySelector(\".photo-grid__text\").textContent = data.name;\n  cardElement.querySelector(\".photo-grid__picture\").src = data.link;\n  cardElement.querySelector(\".photo-grid__picture\").alt = data.name;\n  updateLikeStatus(cardElement, data.likes, myId);\n\n  if (data.owner._id !== myId) {\n    cardElement.querySelector(\".photo-grid__del-button\").remove();\n  }\n\n  deleteButton.addEventListener(\"click\", function () {\n    deleteCard(card, data._id);\n  });\n  likeButton.addEventListener(\"click\", function () {\n    handleLikeChangeStatus(data._id, likeButton.classList.contains('photo-grid__like_active'), card);\n  });\n  return cardElement;\n} // создание карточки\n// formAddPhoto.addEventListener(\"submit\", (element) => {\n//   element.preventDefault();\n//   addNewCard()\n//   closeButton(popupButtonAddCard);\n//   element.target.reset();\n// }); // создание карточки из попапа\n\n\nfunction addNewCard() {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.pushCard)(_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.linkPicture.value, _modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.namePlace.value).then(function (data) {\n    cardAddButton.textContent = \"Создание...\";\n    addCard(data, _api_js__WEBPACK_IMPORTED_MODULE_1__.myId);\n  }).finally(function () {\n    cardAddButton.textContent = \"Создать\";\n  }).catch(function (err) {\n    console.log(err);\n  });\n} // попап с фото\n\n\nfunction openImg(evt) {\n  openButton(popupImage);\n  getCardData(evt);\n} // открытие попапа с фото\n\n\nfunction getCardData(evt) {\n  imgDescription.textContent = evt.target.alt;\n  img.src = evt.target.src;\n  img.alt = imgDescription.textContent;\n} // получение данных из попапа для добавления новой карточки\n// document.addEventListener('mousedown', function (evt) {\n//   if(evt.target.classList.contains('popup__close-button')) {\n//     closeButton(popupImage)\n//   }\n//\n//   if(evt.target.classList.contains('photo-grid__del-button')){\n//     deleteCard(evt.target)\n//   }\n//   if(evt.target.classList.contains('photo-grid__picture')){\n//     openImg(evt)\n//   }\n//   if(evt.target.classList.contains('popup_opened')){\n//     closeButton(popupImage)\n//   }\n// })     //  слушатель на все\n//\n// document.addEventListener('keydown', function (evt) {\n//   if(evt.key === 'Escape') {\n//     closeButton(popupImage)\n//   }\n// })   // слушатель на закрытие по esc\n\n\n\n\n//# sourceURL=webpack://mesto-project/./components/card.js?");

/***/ }),

/***/ "./components/modal_window.js":
/*!************************************!*\
  !*** ./components/modal_window.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addButton\": () => (/* binding */ addButton),\n/* harmony export */   \"addDefaultEditPopupData\": () => (/* binding */ addDefaultEditPopupData),\n/* harmony export */   \"allAvatarInput\": () => (/* binding */ allAvatarInput),\n/* harmony export */   \"allInputEditProfile\": () => (/* binding */ allInputEditProfile),\n/* harmony export */   \"avatarAddButton\": () => (/* binding */ avatarAddButton),\n/* harmony export */   \"closeButton\": () => (/* binding */ closeButton),\n/* harmony export */   \"enableValidation\": () => (/* binding */ enableValidation),\n/* harmony export */   \"formAddPhoto\": () => (/* binding */ formAddPhoto),\n/* harmony export */   \"formEditeAvatarHandler\": () => (/* binding */ formEditeAvatarHandler),\n/* harmony export */   \"formEditeProfileSubmitHandler\": () => (/* binding */ formEditeProfileSubmitHandler),\n/* harmony export */   \"formElementEditAvatar\": () => (/* binding */ formElementEditAvatar),\n/* harmony export */   \"formElementEditProfile\": () => (/* binding */ formElementEditProfile),\n/* harmony export */   \"hideValidationErrorAfterClosePopup\": () => (/* binding */ hideValidationErrorAfterClosePopup),\n/* harmony export */   \"openButton\": () => (/* binding */ openButton),\n/* harmony export */   \"popupButtonAddCard\": () => (/* binding */ popupButtonAddCard),\n/* harmony export */   \"popupEditAvatar\": () => (/* binding */ popupEditAvatar),\n/* harmony export */   \"popupEditProfile\": () => (/* binding */ popupEditProfile),\n/* harmony export */   \"profession\": () => (/* binding */ profession),\n/* harmony export */   \"profileName\": () => (/* binding */ profileName),\n/* harmony export */   \"toggleButtonState\": () => (/* binding */ toggleButtonState)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./components/api.js\");\n\nvar popupButtonAddCard = document.querySelector(\"#popupAddCard\");\nvar popupEditProfile = document.querySelector(\"#popupEditProfile\");\nvar popupEditAvatar = document.querySelector(\"#popupProfileImage\");\nvar formAddPhoto = document.forms.formAddPhoto;\nvar formElementEditProfile = document.forms.formProfile;\nvar formElementEditAvatar = document.forms.formAvatar;\nvar nameInput = formElementEditProfile.name;\nvar jobInput = formElementEditProfile.profession;\nvar avatarInput = formElementEditAvatar.linkAvatar;\nvar profileName = document.querySelector(\".profile__name\");\nvar profession = document.querySelector(\".profile__description\");\nvar allInputEditProfile = Array.from(formElementEditProfile.querySelectorAll(\".popup__input\"));\nvar allAvatarInput = Array.from(formElementEditAvatar.querySelectorAll(\".popup__input\"));\nvar avatarAddButton = formElementEditAvatar.querySelector(\".popup__submit\");\nvar addButton = formElementEditProfile.querySelector(\".popup__submit\");\nvar errorMessagePlace = formAddPhoto.querySelector(\".popup__input_place-error\");\nvar errorMessageLink = formAddPhoto.querySelector(\".popup__input_link-error\");\nvar errorMessageAvatar = formElementEditAvatar.querySelector(\".popup__input_avatar-error\");\n\nfunction openButton(popup) {\n  popup.classList.add(\"popup_opened\");\n} // функция открытия попапа\n\n\nfunction closeButton(popup) {\n  popup.classList.remove(\"popup_opened\");\n} //функция закрытия попапа\n\n\nfunction addDefaultEditPopupData() {\n  nameInput.value = profileName.textContent;\n  jobInput.value = profession.textContent;\n  isValid(nameInput, formElementEditProfile);\n  isValid(jobInput, formElementEditProfile);\n}\n\nfunction formEditeProfileSubmitHandler(evt) {\n  evt.preventDefault();\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.pushDataProfile)(nameInput.value, jobInput.value).then(function (data) {\n    addButton.textContent = \"Сохранение...\";\n    profileName.textContent = data.name;\n    profession.textContent = data.about;\n  }).then(function () {\n    closeButton(popupEditProfile);\n  }).finally(function () {\n    addButton.textContent = \"Сохранить\";\n  }).catch(function (err) {\n    console.log(err);\n  });\n} //добавление значения с сервера в попап с именем\n\n\nfunction formEditeAvatarHandler(evt) {\n  evt.preventDefault();\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.pushDataAvatar)(avatarInput.value).then(function (data) {\n    avatarAddButton.textContent = \"Создание...\";\n    _api_js__WEBPACK_IMPORTED_MODULE_0__.avatar.src = data.avatar;\n  }).then(function () {\n    closeButton(popupEditAvatar);\n  }).finally(function () {\n    avatarAddButton.textContent = \"Создать\";\n  }).catch(function (err) {\n    console.log(err);\n  });\n  formElementEditAvatar.reset();\n} //добавление значения с сервера в попап с аватаром\n/////////////////////////////////////////////\n//VALIDATION\n/////////////////////////////////////////////\n\n\nvar showInputError = function showInputError(inputElement, errorMessage, formElement) {\n  var errorElement = formElement.querySelector(\".\".concat(inputElement.id, \"-error\"));\n  errorElement.classList.add('popup__input-error_active');\n\n  if (inputElement.validity.patternMismatch) {\n    errorElement.textContent = inputElement.dataset.pattern;\n  } else {\n    errorElement.textContent = errorMessage;\n  }\n}; // показываю текст с ошибкой\n\n\nvar hideInputError = function hideInputError(inputElement, formElement) {\n  var errorElement = formElement.querySelector(\".\".concat(inputElement.id, \"-error\"));\n  errorElement.classList.remove('popup__input-error_active');\n  errorElement.textContent = '';\n}; // скрываю текст с ошибкой\n\n\nvar hasInvalidInput = function hasInvalidInput(inputList) {\n  return inputList.some(function (inputElement) {\n    return !inputElement.validity.valid;\n  });\n}; // проверяю поле ввода на наличие ошибок\n\n\nvar toggleButtonState = function toggleButtonState(inputList, button) {\n  if (hasInvalidInput(inputList)) {\n    button.classList.add('popup__submit_disabled');\n    button.disabled = true;\n  } else {\n    button.removeAttribute('disabled');\n    button.classList.remove('popup__submit_disabled');\n  }\n}; // отключаю кнопку при наличии ошибки\n\n\nvar isValid = function isValid(inputElement, formElement) {\n  if (!inputElement.validity.valid) {\n    showInputError(inputElement, inputElement.validationMessage, formElement);\n  } else {\n    hideInputError(inputElement, formElement);\n  }\n}; // показываю и скрываю текст с ошибкой\n\n\nvar setEventListeners = function setEventListeners(formElement) {\n  var inputList = Array.from(formElement.querySelectorAll('.popup__input'));\n  var buttonElement = formElement.querySelector('.popup__submit');\n  inputList.forEach(function (inputElement) {\n    inputElement.addEventListener('input', function () {\n      isValid(inputElement, formElement);\n      toggleButtonState(inputList, buttonElement);\n    });\n  });\n};\n\nvar enableValidation = function enableValidation() {\n  var formList = Array.from(document.querySelectorAll('.popup__form'));\n  formList.forEach(function (formElement) {\n    formElement.addEventListener('submit', function (evt) {\n      evt.preventDefault();\n    });\n    setEventListeners(formElement);\n  });\n};\n\nfunction hideValidationErrorAfterClosePopup() {\n  errorMessagePlace.classList.remove('popup__input-error_active');\n  errorMessageLink.classList.remove('popup__input-error_active');\n  errorMessageAvatar.classList.remove('popup__input-error_active');\n} // скрываю валидацию после закрытия попапа\n\n\n\n\n//# sourceURL=webpack://mesto-project/./components/modal_window.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/modal_window.js */ \"./components/modal_window.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/card.js */ \"./components/card.js\");\n\n // import {avatar, myId, getAllData} from \"./components/api.js\";\n// import {avatar, getAllData} from \"./components/api.js\";\n// let myId = null\n//\n// getAllData()\n//   .then(([cards, data]) => {\n//     profileName.textContent = data.name\n//     profession.textContent = data.about\n//     avatar.src = data.avatar\n//     myId = data._id\n//     cards.reverse().forEach((element) => {\n//       addCard(element, myId);\n//     })\n//   })\n//   .catch((err) => {\n//     console.log(err);\n//   })\n\n_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formElementEditProfile.addEventListener(\"submit\", _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formEditeProfileSubmitHandler); // слушатель для добавления значения с сервера в попап с именем\n\n_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formElementEditAvatar.addEventListener(\"submit\", _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formEditeAvatarHandler); // слушатель для добавления значения с сервера в попап с именем\n\n_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.addEventListener(\"submit\", function (element) {\n  element.preventDefault();\n  (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.addNewCard)();\n  (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupButtonAddCard);\n  element.target.reset();\n}); // создание карточки из попапа\n\n(0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.enableValidation)(); //подключение валидации\n\ndocument.addEventListener('mousedown', function (evt) {\n  if (evt.target.classList.contains('popup__close-button')) {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_card_js__WEBPACK_IMPORTED_MODULE_1__.popupImage);\n  } // if(evt.target.classList.contains('photo-grid__del-button')){\n  //   deleteCard(evt.target)\n  // }\n\n\n  if (evt.target.classList.contains('photo-grid__picture')) {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.openImg)(evt);\n  }\n\n  if (evt.target.classList.contains('popup_opened')) {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_card_js__WEBPACK_IMPORTED_MODULE_1__.popupImage);\n  }\n}); //  слушатель карточек\n\ndocument.addEventListener('keydown', function (evt) {\n  if (evt.key === 'Escape') {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_card_js__WEBPACK_IMPORTED_MODULE_1__.popupImage);\n  }\n}); // слушатель на закрытие по esc\n\ndocument.addEventListener('mousedown', function (evt) {\n  if (evt.target.classList.contains('popup__close-button')) {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditProfile);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupButtonAddCard);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditAvatar);\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.reset();\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formElementEditAvatar.reset();\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.hideValidationErrorAfterClosePopup)();\n  }\n\n  if (evt.target.classList.contains('profile__add-button')) {\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.openButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupButtonAddCard);\n  }\n\n  if (evt.target.classList.contains('profile__edit-button')) {\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.addDefaultEditPopupData)();\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.openButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditProfile);\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.toggleButtonState)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.allInputEditProfile, _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.addButton);\n  }\n\n  if (evt.target.classList.contains('profile__image')) {\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.addDefaultEditPopupData)();\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.openButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditAvatar);\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.toggleButtonState)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.allAvatarInput, _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.avatarAddButton);\n  }\n\n  if (evt.target.classList.contains('popup_opened')) {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditProfile);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupButtonAddCard);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditAvatar);\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.hideValidationErrorAfterClosePopup)();\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.reset();\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formElementEditAvatar.reset();\n  }\n}); // один большой слушатель модальных окон\n\ndocument.addEventListener('keydown', function (evt) {\n  if (evt.key === 'Escape') {\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditProfile);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupButtonAddCard);\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.popupEditAvatar);\n    (0,_components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.hideValidationErrorAfterClosePopup)();\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formAddPhoto.reset();\n    _components_modal_window_js__WEBPACK_IMPORTED_MODULE_0__.formElementEditAvatar.reset();\n  }\n}); // один большой слушатель на закрытие по esc\n// export {myId};\n\n//# sourceURL=webpack://mesto-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;