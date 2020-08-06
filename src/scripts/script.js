//main elements
const popUp = document.querySelector('.popup');
const editPopUp = document.querySelector('.edit-popup');
const addPopUp = document.querySelector('.add-popup');
const editPopUpForm = editPopUp.querySelector('.popup__form');
const addPopUpForm = addPopUp.querySelector('.popup__form');
const cardElementsList = document.querySelector('.photo-elements__list');
const picPopup = document.querySelector('.pic-popup');
//buttons & etc.
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editSaveButton = editPopUp.querySelector('.popup__button');
const addSaveButton = addPopUp.querySelector('.popup__button');
const cardElementTemplate = document.querySelector('#photo-elements-template').content;
const editPopupCloseButton = editPopUp.querySelector('.popup__close-button');
const addPopupCloseButton = addPopUp.querySelector('.popup__close-button');
const picPopupCloseButton = picPopup.querySelector('.pic-popup__close-button');
//fields
//edit-form
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const nameInput = editPopUp.querySelector('#profile-name-input');
const jobInput = editPopUp.querySelector('#profile-job-input');
const nameInputError = editPopUp.querySelector('#profile-name-error');
const jobInputError = editPopUp.querySelector('#profile-job-error');
//add-card-form
const addCardInputName = addPopUp.querySelector('#place-name-input');
const addCardInputLink = addPopUp.querySelector('#place-link-input');
const addCardInputNameError = addPopUp.querySelector('#place-name-error');
const addCardInputLinkError = addPopUp.querySelector('#place-link-error');
//picture popup functionaluty
const closePicPopupByOverlay = (evt) => {
  if (evt.target.classList.contains('pic-popup_opened')) {
    picPopup.classList.remove('pic-popup_opened');
  }
}

const closePicPopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    picPopup.classList.remove('pic-popup_opened');
  }
}

const togglePicPopup = () => {
  picPopup.classList.toggle('pic-popup_opened');
  if (picPopup.classList.contains('pic-popup_opened')) {
    document.addEventListener('keydown', (evt) => {
      closePicPopupByEscape(evt);
    });
    picPopup.addEventListener('mousedown', (evt) => {
      closePicPopupByOverlay(evt);
    });
  }
}

const openCard = (evt) => {
  togglePicPopup();
  picPopup.querySelector('.pic-popup__image').src = evt.target.src;
  picPopup.querySelector('.pic-popup__caption').textContent = evt.target.nextElementSibling.querySelector('.photo-elements__text').textContent;
  picPopupCloseButton.addEventListener('click', togglePicPopup);
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

//popups functionality
const togglePopup = (popupToToggle) => {
  popupToToggle.classList.toggle('popup_opened');

  if (popupToToggle.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closePopupByEscape);
  } else {
    document.removeEventListener('keydown', closePopupByEscape);
  }
}

const resetInputError = (inputElement, inputElementError) => {
  inputElementError.textContent = '';
  inputElementError.classList.remove('popup__input-error-message_visible');
  inputElement.classList.remove('popup__input_type_error');
}

const togglePopupInputError = (popup, inputElement) => {
  const inputElementError = popup.querySelector(`#${inputElement.name}-error`);
  if (inputElement.value.length > 0) {
    resetInputError(inputElement, inputElementError);
  }
}
const closePopupByEscape = () => {
  if (event.key === 'Escape') {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        togglePopup(popup);
      }
    });
  }
}

const toggleEditPopup = () => {
  togglePopup(editPopUp);
  
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
  
  togglePopupInputError(editPopUp, nameInput);
  togglePopupInputError(editPopUp, jobInput);
  
  if (nameInput.validity.valid && jobInput.validity.valid) {
    editSaveButton.disabled = false;
    editSaveButton.classList.remove('popup__button_disabled');
  }
}

const toggleAddPopup = () => {
  // togglePopupInputError(addPopUp, addCardInputName);
  togglePopup(addPopUp);

  if (addPopUp.classList.contains('popup_opened')) {
    if (!addCardInputName.value.length) {
      resetInputError(addCardInputName, addCardInputNameError)
    }
    if (!addCardInputLink.value.length) {
      resetInputError(addCardInputLink, addCardInputLinkError)
    }
  }
}

const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    togglePopup(evt.target);
  }
}

const editSubmitHandler = (evt) => {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditPopup(editPopUp);
}

const disableButton = (buttonElement, classToAdd) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(classToAdd);
}

const addSubmitHandler = (evt) => {
  evt.preventDefault();

  renderPhoto(createPhotoElement(addCardInputName.value, addCardInputLink.value));
  addPopUpForm.reset();
  togglePopup(addPopUp);
  const submitButton = addPopUpForm.querySelector('.popup__button');
  disableButton(submitButton, 'popup__button_disabled')
}
//eventListeners
//profileEditing
editButton.addEventListener('click', () => {
  toggleEditPopup();
});
editPopupCloseButton.addEventListener('click', () => {
  toggleEditPopup();
});
editPopUpForm.addEventListener('submit', editSubmitHandler);
//cardAdding
addButton.addEventListener('click', () => {
  toggleAddPopup();
});
addPopupCloseButton.addEventListener('click', () => {
  togglePopup(addPopUp);
})
addPopUpForm.addEventListener('submit', addSubmitHandler);
//closing popups overlay
editPopUp.addEventListener('mousedown', (evt) => {
  closePopupByOverlay(evt);
});
addPopUp.addEventListener('mousedown', (evt) => {
  closePopupByOverlay(evt);
});