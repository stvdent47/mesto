import './index.css';
import { editModalForm, addModalForm, avatarUpdateForm, cardElementsList, cardElementTemplate, openEditModalButton, openaddModalButton, avatarButton, nameField, jobField, nameInput, jobInput, validationSettings, initialCards } from '../utils/constants.js';
import { createNewCard } from '../utils/utils.js';
import Api from '../components/Api';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
/**
 * creating class for enlarged pictures
 */
const newModalWithImage = new PopupWithImage('.pic-modal');
newModalWithImage.setEventListeners();
/**
 * rendering initial cards
 */
const initialCardsToRender = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    const newCard = createNewCard(newModalWithImage, cardItem, cardElementTemplate);
    initialCardsToRender.addItem(newCard);
  }
}, cardElementsList);
initialCardsToRender.renderItems();
/**
 * validating user info editing form
 */
const newUserInfo = new UserInfo (nameField, jobField);
const editFormValidator = new FormValidator(validationSettings, editModalForm);
editFormValidator.enableValidation();
/**
 * creating a modal of profile editing
 */
const editProfileModal = new PopupWithForm ({
  modalSelector: '.edit-modal',
  formSubmitHandler: (item) => {
    newUserInfo.setUserInfo(item[`profile-name`], item[`profile-job`]);
    editProfileModal.close();
  },
  modalOpenHandler: () => {
    const currentUserInfo = newUserInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.description;
    editFormValidator.resetInitialInputErrors();
  }
});
editProfileModal.setEventListeners();
openEditModalButton.addEventListener('click', () => {
  editProfileModal.open();  
});
/**
 * validating card adding form
 */
const addCardFormValidator = new FormValidator(validationSettings, addModalForm);
addCardFormValidator.enableValidation();
/**
 * creating a modal of card adding
 */
const addCardModal = new PopupWithForm ({
  modalSelector: '.add-modal',
  formSubmitHandler: (item) => {
    const newItem = {
      name: item[`place-name`],
      link: item[`place-link`]
    }
    const newCard = createNewCard(newModalWithImage, newItem, cardElementTemplate);
    cardElementsList.prepend(newCard);
    addCardModal.close();
  },
  modalOpenHandler: () => {
    addCardFormValidator.resetInitialInputErrors();
  }
});
addCardModal.setEventListeners();
openaddModalButton.addEventListener('click', () => {
  addCardModal.open();
});
/**
 * validating avatar updating form
 */
const avatarUpdateFormValivator = new FormValidator(validationSettings, avatarUpdateForm);
avatarUpdateFormValivator.enableValidation();
/**
 * creating a modal of avatar updating
 */
const updateAvatarModal = new PopupWithForm({
  modalSelector: '.avatar-update-modal',
  formSubmitHandler: () => {

    updateAvatarModal.close();
  },
  modalOpenHandler: () => {
    avatarUpdateFormValivator.resetInitialInputErrors();
  }
});
updateAvatarModal.setEventListeners();
avatarButton.addEventListener('click', () => {
  updateAvatarModal.open();
});
/**
 * creating a modal of card removing
 */
const removeCardModal = new PopupWithSubmit({
  modalSelector: '.remove-modal',
  formSubmitHandler: () => {
    alert('dsdas');

    removeCardModal.close();
  }
});
removeCardModal.setEventListeners();

const currentApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '1ed91742-56fd-4a56-812b-580db32d6be2',
    'Content-Type': 'application/json'
  }
});
currentApi.getInitialCards();
currentApi.getUserInfo();

currentApi.getUserInfo()
  .then(res => newUserInfo.setUserInfo(res.name, res.about))
  .catch(err => alert(err));