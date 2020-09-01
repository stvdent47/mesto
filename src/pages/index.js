import { editModal, addModal, editModalForm, addModalForm, cardElementsList, cardElementTemplate, openEditModalButton, editModalSaveButton, editModalCloseButton, openaddModalButton, addModalSaveButton, addModalCloseButton, nameField, jobField, nameInput, jobInput, addCardInputName, addCardInputLink, addCardInputNameError, addCardInputLinkError } from '../utils/constants.js';
import { initialCards } from '../components/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Modal from '../components/Modal.js';
import ModalWithImage from '../components/ModalWithImage.js';

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

const setButtonState = (buttonElement, classElement, state) => {
  if (state) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classElement);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(classElement);
  }
}
//modals functionality
const toggleModal = (modalToToggle) => {
  modalToToggle.classList.toggle('modal_opened');

  // if (modalToToggle.classList.contains('modal_opened')) {
  //   document.addEventListener('keydown', closeModalByEsc);
  // } else {
  //   document.removeEventListener('keydown', closeModalByEsc);
  // }
}

const resetInputError = (inputElement, inputElementError) => {
  inputElementError.textContent = '';
  inputElementError.classList.remove('modal__input-error-message_visible');
  inputElement.classList.remove('modal__input_type_error');
}

const toggleModalInputError = (modal, inputElement) => {
  const inputElementError = modal.querySelector(`#${inputElement.name}-error`);
  if (inputElement.value.length > 0) {
    resetInputError(inputElement, inputElementError);
  }
}
//closing an active modal if escape key is pressed
// const closeModalByEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const modalList = Array.from(document.querySelectorAll('.modal'));
//     modalList.forEach((modal) => {
//       if (modal.classList.contains('modal_opened')) {
//         toggleModal(modal);
//       }
//     });
//   }
// }
//closing an active modal if clicked outside the modal
// const closeModalByOverlay = (evt) => {
//   if (evt.target.classList.contains('modal_opened')) {
//     toggleModal(evt.target);
//   }
// }
//modals toggling functions
//toggling profile editing modal
// const toggleEditModal = () => {
//   toggleModal(editModal);
  
//   nameInput.value = nameField.textContent;
//   jobInput.value = jobField.textContent;
  
//   toggleModalInputError(editModal, nameInput);
//   toggleModalInputError(editModal, jobInput);
  
//   if (nameInput.validity.valid && jobInput.validity.valid) {
//     setButtonState(editModalSaveButton, 'modal__button_disabled', true);
//   }
// }
const editProfileModal = new Modal ('.edit-modal');
editProfileModal.setEventListeners();
//toggling new card adding modal
const toggleAddModal = () => {
  toggleModal(addModal);

  if (addModal.classList.contains('modal_opened')) {
    if (!addCardInputName.value.length) {
      resetInputError(addCardInputName, addCardInputNameError)
    }
    if (!addCardInputLink.value.length) {
      resetInputError(addCardInputLink, addCardInputLinkError)
    }
  }
}
//modals submit handlers
//profile editing
const editSubmitHandler = (evt) => {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditModal(editModal);
}
//new card creating
const addSubmitHandler = (evt) => {
  evt.preventDefault();

  const newItem = {
    name: addCardInputName.value,
    link: addCardInputLink.value
  }

  const newCard = new Card(newItem , cardElementTemplate).createCard();
  cardElementsList.prepend(newCard);
  addModalForm.reset();
  toggleModal(addModal);
  setButtonState(addModalSaveButton, 'modal__button_disabled', false);
}
//forms validation
const validationSettings = {
    formSelector: '.modal__form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__button',
    inactiveButtonClass: 'modal__button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__input-error-message_visible'
};

const editFormValidator = new FormValidator(validationSettings, editModalForm);
const addCardFormValidator = new FormValidator(validationSettings, addModalForm);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
//eventListeners
//profileEditing
openEditModalButton.addEventListener('click', () => {
  editProfileModal.open();
});
// editModalCloseButton.addEventListener('click', () => {
//   toggleModal(editModal);
// });
editModalForm.addEventListener('submit', editSubmitHandler);
//cardAdding
openaddModalButton.addEventListener('click', toggleAddModal);
addModalCloseButton.addEventListener('click', () => {
  toggleModal(addModal);
})
addModalForm.addEventListener('submit', addSubmitHandler);
//closing modals by overlay
// editModal.addEventListener('mousedown', (evt) => {
//   closeModalByOverlay(evt);
// });
addModal.addEventListener('mousedown', (evt) => {
  closeModalByOverlay(evt);
});

// document.querySelector('.photo-elements__image').addEventListener('click', () => {
//   alert('dfasd')
//   const newModalWithImage = new ModalWithImage('.pic-modal');
//   newModalWithImage.open();
// })