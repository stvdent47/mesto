/**
 * index.js constants
 * main elements
 */
export const editModal = document.querySelector('.edit-modal');
export const editModalForm = editModal.querySelector('.modal__form');
export const addModal = document.querySelector('.add-modal');
export const addModalForm = addModal.querySelector('.modal__form');
export const avatarUpdateModal = document.querySelector('.avatar-update-modal');
export const avatarUpdateForm = avatarUpdateModal.querySelector('.modal__form');
export const picModal = document.querySelector('.pic-modal');
export const cardElementsList = document.querySelector('.photo-elements__list');
export const cardElementTemplate = document.querySelector('#photo-elements-template').content;
export const profilePhoto = document.querySelector('.profile__photo');
/**
 * buttons
 */
export const openEditModalButton = document.querySelector('.profile__edit-button');
export const openaddModalButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__photo');
/**
 * edit-form fields
 */
export const nameField = document.querySelector('.profile__name');
export const jobField = document.querySelector('.profile__description');
export const nameInput = editModal.querySelector('#profile-name-input');
export const jobInput = editModal.querySelector('#profile-job-input');
/**
 * data for a form validating
 */
export const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error-message_visible'
};

// export const initialCards = [
//   {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];