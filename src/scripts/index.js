import Card from './Card.js';
import FormValidator from './FormValidator.js';

//main elements
const editModal = document.querySelector('.edit-modal');
const addModal = document.querySelector('.add-modal');
const editModalForm = editModal.querySelector('.modal__form');
const addModalForm = addModal.querySelector('.modal__form');
const cardElementsList = document.querySelector('.photo-elements__list');
const cardElementTemplate = document.querySelector('#photo-elements-template').content;
//buttons
const openeditModalButton = document.querySelector('.profile__edit-button');
const editModalSaveButton = editModal.querySelector('.modal__button');
const editModalCloseButton = editModal.querySelector('.modal__close-button');
const openaddModalButton = document.querySelector('.profile__add-button');
const addModalSaveButton = addModal.querySelector('.modal__button');
const addModalCloseButton = addModal.querySelector('.modal__close-button');
//fields
//edit-form
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__description');
const nameInput = editModal.querySelector('#profile-name-input');
const jobInput = editModal.querySelector('#profile-job-input');
//add-card-form
const addCardInputName = addModal.querySelector('#place-name-input');
const addCardInputLink = addModal.querySelector('#place-link-input');
const addCardInputNameError = addModal.querySelector('#place-name-error');
const addCardInputLinkError = addModal.querySelector('#place-link-error');
//rendering initial cards
initialCards.forEach((item) => {
  const newCard = new Card(item, cardElementTemplate)._createCard();
  cardElementsList.prepend(newCard);
})

//modals functionality
const toggleModal = (modalToToggle) => {
  modalToToggle.classList.toggle('modal_opened');

  if (modalToToggle.classList.contains('modal_opened')) {
    document.addEventListener('keydown', closeModalByEsc);
  } else {
    document.removeEventListener('keydown', closeModalByEsc);
  }
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

const closeModalByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const modalList = Array.from(document.querySelectorAll('.modal'));
    modalList.forEach((modal) => {
      if (modal.classList.contains('modal_opened')) {
        toggleModal(modal);
      }
    });
  }
}

const toggleEditModal = () => {
  toggleModal(editModal);
  
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
  
  toggleModalInputError(editModal, nameInput);
  toggleModalInputError(editModal, jobInput);
  
  if (nameInput.validity.valid && jobInput.validity.valid) {
    editModalSaveButton.disabled = false;
    editModalSaveButton.classList.remove('modal__button_disabled');
  }
}

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

const closeModalByOverlay = (evt) => {
  if (evt.target.classList.contains('modal_opened')) {
    toggleModal(evt.target);
  }
}

const editSubmitHandler = (evt) => {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditModal(editModal);
}

const setButtonState = (buttonElement, classElement, state) => {
  if (state) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classElement);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(classElement);
  }
}

const addSubmitHandler = (evt) => {
  evt.preventDefault();

  const newItem = {
    name: addCardInputName.value,
    link: addCardInputLink.value
  }

  const newCard = new Card(newItem , cardElementTemplate)._createCard();
  cardElementsList.prepend(newCard);
  addModalForm.reset();
  toggleModal(addModal);
  setButtonState(addModalSaveButton, 'modal__button_disabled', false);
}

const validationSettings = {
    formSelector: '.modal__form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__button',
    inactiveButtonClass: 'modal__button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__input-error-message_visible'
  };
//forms validation
const profileFormValidator = new FormValidator(validationSettings, editModalForm);
const addFormValidator = new FormValidator(validationSettings, addModalForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
//eventListeners
//profileEditing
openeditModalButton.addEventListener('click', toggleEditModal);
editModalCloseButton.addEventListener('click', toggleEditModal);
editModalForm.addEventListener('submit', editSubmitHandler);
//cardAdding
openaddModalButton.addEventListener('click', toggleAddModal);
addModalCloseButton.addEventListener('click', () => {
  toggleModal(addModal);
})
addModalForm.addEventListener('submit', addSubmitHandler);
//closing modals by overlay
editModal.addEventListener('mousedown', (evt) => {
  closeModalByOverlay(evt);
});
addModal.addEventListener('mousedown', (evt) => {
  closeModalByOverlay(evt);
});