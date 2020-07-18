const editButton = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector('.edit-popup');
const editPopupForm = document.querySelector('.edit-popup__form');
const editCloseButton = document.querySelector('.edit-popup__close-button');

const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const toggleEditPopup = () => {
  if (!editPopUp.classList.contains('edit-popup_opened')) {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
  }
  editPopUp.classList.toggle('edit-popup_opened');
}

const editSubmitHandler = (e) => {
  e.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  toggleEditPopup();
}

const addButton = document.querySelector('.profile__add-button');
const addPopUp = document.querySelector('.add-popup');
const addPopupForm = document.querySelector('.add-popup__form');
const addCloseButton = document.querySelector('.add-popup__close-button');

const toggleAddPopup = () => {
  addPopUp.classList.toggle('add-popup_opened');
}

const addSubmitHandler = (e) => {
  e.preventDefault();

  toggleAddPopup();
}

editButton.addEventListener('click', toggleEditPopup);
editCloseButton.addEventListener('click', toggleEditPopup);
editPopupForm.addEventListener('submit', editSubmitHandler);

addButton.addEventListener('click', toggleAddPopup);
addCloseButton.addEventListener('click', toggleAddPopup);
addPopupForm.addEventListener('submit', addSubmitHandler);

const likeButton = document.querySelector('.photo-elements__like-button');
const toggleLikeButton = (e) => {
  e.target.classList.toggle('photo-elements__like-button_active');
}

document.querySelector('.photo-elements__like-button').addEventListener('click', toggleLikeButton);