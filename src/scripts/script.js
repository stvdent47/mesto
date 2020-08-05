const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
//add-card-form
const newPhotoElementName = addPopUp.querySelector('#place-name-input');
const newPhotoElementLink = addPopUp.querySelector('#place-link-input');
//picture popup functionaluty
const closePicPopupByOverlay = (evt) => {
  if (!evt.target.classList[0].startsWith('pic-popup__')) {
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
  cardElement.querySelector('.photo-elements__image').src = imageLink;
  cardElement.querySelector('.photo-elements__text').textContent = caption;

  cardElement.querySelector('.photo-elements__like-button').addEventListener('click', toggleLikeButton);
  cardElement.querySelector('.photo-elements__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.photo-elements__image').addEventListener('click', openCard);

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
}

const toggleEditPopup = (popupToToggle) => {
  if (!popupToToggle.classList.contains('popup_opened')) {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
  }
  togglePopup(popupToToggle);
}

const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        togglePopup(popup);
      }
    });
  }
}

const closePopupByOverlay = (evt) => {
  if (!evt.target.classList[0].startsWith('popup__')) {
    togglePopup(evt.target);
  }
}

const editSubmitHandler = (evt) => {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditPopup(editPopUp);
}

const addSubmitHandler = (evt) => {
  evt.preventDefault();

  renderPhoto(createPhotoElement(newPhotoElementName.value, newPhotoElementLink.value));
  addPopUpForm.reset();
  togglePopup(addPopUp);
}
//eventListeners
//profileEditing
editButton.addEventListener('click', () => {
  toggleEditPopup(editPopUp);
});
editPopupCloseButton.addEventListener('click', () => {
  toggleEditPopup(editPopUp);
});
editPopUpForm.addEventListener('submit', editSubmitHandler);
//cardAdding
addButton.addEventListener('click', () => {
  togglePopup(addPopUp);
});
addPopupCloseButton.addEventListener('click', () => {
  togglePopup(addPopUp);
})
addPopUpForm.addEventListener('submit', addSubmitHandler);
//closing popups by esc/overlay
document.addEventListener('keydown', (evt) => {
  closePopupByEscape(evt);
})
editPopUp.addEventListener('mousedown', (evt) => {
  closePopupByOverlay(evt);
});
addPopUp.addEventListener('mousedown', (evt) => {
  closePopupByOverlay(evt);
});