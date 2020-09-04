import { editModalForm, addModalForm, cardElementsList, cardElementTemplate, openEditModalButton, openaddModalButton, nameField, jobField, nameInput, jobInput, validationSettings } from '../utils/constants.js';
import { initialCards } from '../components/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';
import UserInfo from '../components/UserInfo.js';
//creating class for enlarged pictures
const newModalWithImage = new ModalWithImage('.pic-modal');
newModalWithImage.setEventListeners();
//rendering initial cards
const initialCardsToRender = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      data: cardItem,
      templateSelector: cardElementTemplate,
      handleCardClick: (name, link) => {
        newModalWithImage.open(name, link);
      }
    }).createCard();
    initialCardsToRender.addItem(card);
  }
}, cardElementsList);
initialCardsToRender.renderItems();
//profile editing functionality
const newUserInfo = new UserInfo (nameField, jobField);
const editFormValidator = new FormValidator(validationSettings, editModalForm);
editFormValidator.enableValidation();
//creating a modal of profile editing
const editProfileModal = new ModalWithForm ({
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
const addCardModal = new ModalWithForm ({
  modalSelector: '.add-modal',
  formSubmitHandler: (item) => {
    const newItem = {
      name: item[`place-name`],
      link: item[`place-link`]
    }
  
    const newCard = new Card({
      data: newItem,
      templateSelector: cardElementTemplate,
      handleCardClick: (name, link) => {
        newModalWithImage.open(name, link);
      }
    }).createCard();
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