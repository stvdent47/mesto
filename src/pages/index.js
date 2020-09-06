import './index.css';
import { editModalForm, addModalForm, cardElementsList, cardElementTemplate, openEditModalButton, openaddModalButton, nameField, jobField, nameInput, jobInput, validationSettings, initialCards } from '../utils/constants.js';
import { createNewCard } from '../utils/utils.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
//creating class for enlarged pictures
const newModalWithImage = new PopupWithImage('.pic-modal');
newModalWithImage.setEventListeners();
//rendering initial cards
const initialCardsToRender = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    const newCard = createNewCard(newModalWithImage, cardItem, cardElementTemplate);
    initialCardsToRender.addItem(newCard);
  }
}, cardElementsList);
initialCardsToRender.renderItems();
//profile editing functionality
const newUserInfo = new UserInfo (nameField, jobField);
const editFormValidator = new FormValidator(validationSettings, editModalForm);
editFormValidator.enableValidation();
//creating a modal of profile editing
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
//card adding functionality
const addCardFormValidator = new FormValidator(validationSettings, addModalForm);
addCardFormValidator.enableValidation();
//creating a modal of card adding
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