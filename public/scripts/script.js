let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let nameField = document.querySelector('.profile__name');
let jobField = document.querySelector('.profile__job');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#job-input');
let popupForm = document.querySelector('.popup__form');

const togglePopup = () => {
  if (!popUp.classList.contains('popup_opened')) {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
  }
  popUp.classList.toggle('popup_opened');
}

const submitHandler = (e) => {
  e.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', submitHandler);