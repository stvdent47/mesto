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

const toggleLikeButton = (e) => {
  e.target.classList.toggle('photo-elements__like-button_active');
}

const deleteCard = (e) => {
  e.target.closest('.photo-elements__item').remove();
}

//picture popup functionaluty
const togglePicPopup = () => {
  picPopup.classList.toggle('pic-popup_opened');
}

const openCard = (e) => {
  togglePicPopup();
  picPopup.querySelector('.pic-popup__image').src = e.target.src;
  picPopup.querySelector('.pic-popup__caption').textContent = e.target.nextElementSibling.querySelector('.photo-elements__text').textContent;
  picPopupCloseButton.addEventListener('click', togglePicPopup);
}

//card adding functionality
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

const editSubmitHandler = (e) => {
  e.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditPopup(editPopUp);
}

const addSubmitHandler = (e) => {
  e.preventDefault();

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