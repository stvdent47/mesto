import './index.css';
import { editModalForm, addModalForm, avatarUpdateForm, cardElementsList, cardElementTemplate, openEditModalButton, openaddModalButton, avatarButton, nameField, jobField, nameInput, jobInput, profilePhoto, likeCounter, validationSettings, initialCards } from '../utils/constants.js';
import { createNewCard } from '../utils/utils.js';
import Api from '../components/Api';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card';
/**
 * creating api class
 */
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '1ed91742-56fd-4a56-812b-580db32d6be2',
    'Content-Type': 'application/json'
  }
});
/**
 * creating user info class
 */
const newUserInfo = new UserInfo (nameField, jobField);
/**
 * validating card adding form
 */
const addCardFormValidator = new FormValidator(validationSettings, addModalForm);
addCardFormValidator.enableValidation();
/**
 * validating user info editing form
 */
const editFormValidator = new FormValidator(validationSettings, editModalForm);
editFormValidator.enableValidation();
/**
 * creating a modal of profile editing
 */
const editProfileModal = new PopupWithForm ({
  modalSelector: '.edit-modal',
  formSubmitHandler: (item) => {
    editProfileModal.setBtnLoadingState(true);
    api.editProfile(item)
      .then(res => {
        newUserInfo.setUserInfo(res.name, res.about);
        editProfileModal.close();
      })
      .catch(err => alert(err))
      .finally(() => editProfileModal.setBtnLoadingState(false));
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
 * creating a modal of an enlarged card picture
 */
const newModalWithImage = new PopupWithImage('.pic-modal');
newModalWithImage.setEventListeners();
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
    updateAvatarModal.setBtnLoadingState(true);
    const avatarUrl = document.querySelector('#avatar-link-input').value;
    api.updateAvatar(avatarUrl)
      .then(res => {
        profilePhoto.src = res.avatar;
        updateAvatarModal.close();
      })
      .catch(err => alert(err))
      .finally(() => updateAvatarModal.setBtnLoadingState(false));    
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
export const removeCardModal = new PopupWithSubmit('.remove-card-modal');
removeCardModal.setEventListeners();

Promise.all([api.getProfileInfo(), api.getCards()]).then(res => {
  const profileInfo = res[0];
  const initialCards = res[1];
  const userId = profileInfo._id;
  /**
   * setting user profile data from server
   */
  newUserInfo.setUserInfo(profileInfo.name, profileInfo.about);
  profilePhoto.src = profileInfo.avatar;
  /**
  * rendering initial cards
  */
  const initialCardsToRender = new Section ({
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = createNewCard(cardItem, cardElementTemplate, userId, newModalWithImage, removeCardModal, api);
      initialCardsToRender.addItem(newCard);
    }
  }, cardElementsList);
  initialCardsToRender.renderItems();
  /**
  * creating a modal of card adding
  */
  const addCardModal = new PopupWithForm ({
    modalSelector: '.add-modal',
    formSubmitHandler: (item) => {
      addCardModal.setBtnLoadingState(true);
      const newItem = {
        name: item[`place-name`],
        link: item[`place-link`]
      }
      api.addCard(newItem)
        .then((res) => {
          addCardModal.setBtnLoadingState(true);
          const newCard = createNewCard(res, cardElementTemplate, userId, newModalWithImage, removeCardModal, api);
          cardElementsList.prepend(newCard);
  
          addCardModal.setBtnLoadingState(false);
          addCardModal.close();
        });
    },
    modalOpenHandler: () => {
      addCardFormValidator.resetInitialInputErrors();
    }
  });
  addCardModal.setEventListeners();
  openaddModalButton.addEventListener('click', () => {
    addCardModal.open();
  });
})
  .catch(err => alert(err));