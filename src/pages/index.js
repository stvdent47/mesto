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
// Promise.all([api.getProfileInfo(), api.getCards()]).then(res => {
//   const profileInfo = res[0];
//   const initialCards = res[1];
//   console.log(profileInfo);
//   console.log(initialCards);
// })
/**
 * setting user profile data from server
 */
const newUserInfo = new UserInfo (nameField, jobField);
api.getProfileInfo()
.then(res => {
  newUserInfo.setUserInfo(res.name, res.about)
  profilePhoto.src = res.avatar;
})
.catch(err => alert(err));
/**
 * rendering initial cards
 */
api.getCards()
  .then(items => {
    const initialCardsToRender = new Section ({
      items: items,
      renderer: (cardItem) => {

        const newCard = new Card(cardItem, cardElementTemplate,
          {
          handleCardClick: (name, link) => {
            newModalWithImage.open(name, link);
          },
          handleLikeClick: (id) => {
            alert('card liked');
          },
          handleDeleteIconClick: () => {
            api.removeCard(cardItem._id)
              .then(res => {
                console.log(res);

              })
            console.log(cardItem._id)
          }
        }).createCard();
        initialCardsToRender.addItem(newCard);
        console.log(`the card item id: ${cardItem._id}`)
        // const newCard = createNewCard(newModalWithImage, cardItem, cardElementTemplate);
          // initialCardsToRender.addItem(newCard);
      }
    }, cardElementsList);
  initialCardsToRender.renderItems();
}).
  catch(err => alert(err));
/**
 * creating class for enlarged pictures
 */
const newModalWithImage = new PopupWithImage('.pic-modal');
newModalWithImage.setEventListeners();
/**
 * creating a modal of card removing
 */
const removeCardModal = new PopupWithSubmit({
  modalSelector: '.remove-card-modal',
  formSubmitHandler: () => {
    api.removeCard()
      .then(res => console.log(res))

    removeCardModal.close();
  }
});
removeCardModal.setEventListeners();
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
 * validating card adding form
 */
const addCardFormValidator = new FormValidator(validationSettings, addModalForm);
addCardFormValidator.enableValidation();
/**
 * creating a modal of card adding
 */
// const addCardModal = new PopupWithForm ({
//   modalSelector: '.add-modal',
//   formSubmitHandler: (item) => {
//     addCardModal.setBtnLoadingState(true);
//     const newItem = {
//       name: item[`place-name`],
//       link: item[`place-link`]
//     }
//     const newCard = createNewCard(newModalWithImage, newItem, cardElementTemplate);
//     cardElementsList.prepend(newCard);
//     addCardModal.close();
//     addCardModal.setBtnLoadingState(false);
//   },
//   modalOpenHandler: () => {
//     addCardFormValidator.resetInitialInputErrors();
//   }
// });
// addCardModal.setEventListeners();
// openaddModalButton.addEventListener('click', () => {
//   addCardModal.open();
// });
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
        const newCard = new Card(res, cardElementTemplate,
          {
          handleCardClick: (name, link) => {
            newModalWithImage.open(name, link);
          },
          handleLikeClick: (id) => {
            alert('card liked');
          },
          handleDeleteIconClick: () => {
            api.removeCard(res._id)
              .then(res => {
                console.log(res);
              })
            console.log(res._id)
          }
        }).createCard();
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