window.addEventListener('load', () => {
  let editButton = document.querySelector('.edit-button');
  let popUp = document.querySelector('.popup');
  let closeButton = document.querySelector('.popup__close-button');
  let saveButton = document.querySelector('.popup__submit');
  let nameField = document.querySelector('.profile__name');
  let jobField = document.querySelector('.profile__job');
  let nameInput = document.querySelector('#nameInput');
  let jobInput = document.querySelector('#jobInput');

  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  editButton.addEventListener('click', () => {
    popUp.classList.toggle('popup_opened');
  })

  closeButton.addEventListener('click', () => {
    popUp.classList.toggle('popup_opened');
  })

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // let nameInput = document.querySelector('#nameInput');
    // let jobInput = document.querySelector('#jobInput');

    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    popUp.classList.toggle('popup_opened');
  })
})