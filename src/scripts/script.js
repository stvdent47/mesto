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


const toggleLikeButton = (e) => {
  e.target.classList.toggle('photo-elements__like-button_active');
}

const deleteCard = (e) => {
  e.target.closest('.photo-elements__item').remove();
}

//picture popup functionaluty
const togglePicPopup = () => {
  const picPopup = document.querySelector('.pic-popup');
  picPopup.classList.toggle('pic-popup_opened');
}

const openCard = (e) => {
  const picPopupCloseButton = document.querySelector('.pic-popup__close-button');
  
  togglePicPopup();
  document.querySelector('.pic-popup__image').src = e.target.src;
  document.querySelector('.pic-popup__caption').textContent =   e.target.nextElementSibling.querySelector('.photo-elements__text').textContent;

  picPopupCloseButton.addEventListener('click', togglePicPopup);
}

//card adding functionality
const addPhotoElement = (caption, imageLink) => {
  const photoElementTemplate = document.querySelector('#photo-elements-template').content;
  const photoElement = photoElementTemplate.cloneNode(true);
  photoElement.querySelector('.photo-elements__image').src = imageLink;
  photoElement.querySelector('.photo-elements__text').textContent = caption;
  const photoElementsList = document.querySelector('.photo-elements__list');
  
  photoElementsList.prepend(photoElement);

  document.querySelector('.photo-elements__like-button').addEventListener('click', toggleLikeButton);
  document.querySelector('.photo-elements__delete-button').addEventListener('click', deleteCard);
  document.querySelector('.photo-elements__image').addEventListener('click', openCard);
  
}

//initial cards rendering
const renderCards = (arr) => {
  arr.forEach((item) => {
    addPhotoElement(item.name, item.link);
  })
}
renderCards(initialCards);

//profile info editing functionality
const editButton = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector('.edit-popup');
const editPopupForm = document.querySelector('.edit-popup__form');
const editCloseButton = document.querySelector('.edit-popup__close-button');

const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const nameInput = document.querySelector('#profile-name-input');
const jobInput = document.querySelector('#profile-job-input');

const toggleEditPopup = () => {
  if (!editPopUp.classList.contains('popup_opened')) {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
  }
  editPopUp.classList.toggle('popup_opened');
}

const editSubmitHandler = (e) => {
  e.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditPopup();
}

//card adding functionality
const addButton = document.querySelector('.profile__add-button');
const addPopUp = document.querySelector('.add-popup');
const addPopupForm = document.querySelector('.add-popup__form');
const addCloseButton = document.querySelector('.add-popup__close-button');

const toggleAddPopup = () => {
  addPopUp.classList.toggle('add-popup_opened');
}

const addSubmitHandler = (e) => {
  e.preventDefault();

  const newPhotoElementName = document.querySelector('#place-name-input').value;
  const newPhotoElementLink = document.querySelector('#place-link-input').value;

  addPhotoElement(newPhotoElementName, newPhotoElementLink);
  document.querySelector('.add-popup__form').reset();
  toggleAddPopup();
}

//eventListeners

//profileEditing
editButton.addEventListener('click', toggleEditPopup);
editCloseButton.addEventListener('click', toggleEditPopup);
editPopupForm.addEventListener('submit', editSubmitHandler);

//cardAdding
addButton.addEventListener('click', toggleAddPopup);
addCloseButton.addEventListener('click', toggleAddPopup);
addPopupForm.addEventListener('submit', addSubmitHandler);

