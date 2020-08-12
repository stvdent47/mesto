//main elements
const modal = document.querySelector('.modal');
const editModal = document.querySelector('.edit-modal');
const addModal = document.querySelector('.add-modal');
const editModalForm = editModal.querySelector('.modal__form');
const addModalForm = addModal.querySelector('.modal__form');
const cardElementsList = document.querySelector('.photo-elements__list');
const picModal = document.querySelector('.pic-modal');
const cardElementTemplate = document.querySelector('#photo-elements-template').content;
//buttons
const openeditModalButton = document.querySelector('.profile__edit-button');
const editModalSaveButton = editModal.querySelector('.modal__button');
const editModalCloseButton = editModal.querySelector('.modal__close-button');
const openaddModalButton = document.querySelector('.profile__add-button');
const addModalSaveButton = addModal.querySelector('.modal__button');
const addModalCloseButton = addModal.querySelector('.modal__close-button');
const picModalCloseButton = picModal.querySelector('.pic-modal__close-button');
//fields
//edit-form
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__description');
const nameInput = editModal.querySelector('#profile-name-input');
const jobInput = editModal.querySelector('#profile-job-input');
const nameInputError = editModal.querySelector('#profile-name-error');
const jobInputError = editModal.querySelector('#profile-job-error');
//add-card-form
const addCardInputName = addModal.querySelector('#place-name-input');
const addCardInputLink = addModal.querySelector('#place-link-input');
const addCardInputNameError = addModal.querySelector('#place-name-error');
const addCardInputLinkError = addModal.querySelector('#place-link-error');
//picture modal functionaluty
const closepicModalByOverlay = (evt) => {
  if (evt.target.classList.contains('pic-modal_opened')) {
    picModal.classList.remove('pic-modal_opened');
  }
}

const closepicModalByEscape = (evt) => {
  if (evt.key === 'Escape') {
    picModal.classList.remove('pic-modal_opened');
    document.removeEventListener('keydown', closepicModalByEscape);
  }
}

const togglepicModal = () => {
  picModal.classList.toggle('pic-modal_opened');
  
  if (picModal.classList.contains('pic-modal_opened')) {
    picModal.addEventListener('mousedown', (evt) => {
      closepicModalByOverlay(evt);
    });
    document.addEventListener('keydown', closepicModalByEscape);
  }
}

const openCard = (evt) => {
  togglepicModal();
  picModal.querySelector('.pic-modal__image').src = evt.target.src;
  picModal.querySelector('.pic-modal__caption').textContent = evt.target.nextElementSibling.querySelector('.photo-elements__text').textContent;
  picModalCloseButton.addEventListener('click', togglepicModal);
}

//card adding functionality
const toggleLikeButton = (evt) => {
  evt.target.classList.toggle('photo-elements__like-button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.photo-elements__item').remove();
}

const createPhotoElement = (caption, imageLink) => {
  const cardElement = cardElementTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-elements__image');
  cardImage.src = imageLink;
  cardElement.querySelector('.photo-elements__text').textContent = caption;

  cardElement.querySelector('.photo-elements__like-button').addEventListener('click', toggleLikeButton);
  cardElement.querySelector('.photo-elements__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openCard);

  return cardElement;
}

const renderPhoto = (card) => {
  cardElementsList.prepend(card);
}

initialCards.forEach((card) => {
  renderPhoto(createPhotoElement(card.name, card.link));
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

const toggleeditModal = () => {
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

const toggleaddModal = () => {
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
  toggleeditModal(editModal);
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

  renderPhoto(createPhotoElement(addCardInputName.value, addCardInputLink.value));
  addModalForm.reset();
  toggleModal(addModal);
  setButtonState(addModalSaveButton, 'modal__button_disabled', false);
}
//eventListeners
//profileEditing
openeditModalButton.addEventListener('click', toggleeditModal);
editModalCloseButton.addEventListener('click', toggleeditModal);
editModalForm.addEventListener('submit', editSubmitHandler);
//cardAdding
openaddModalButton.addEventListener('click', toggleaddModal);
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