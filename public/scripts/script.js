window.addEventListener('load', () => {
  let editButton = document.querySelector('.edit-button');
  let popUp = document.querySelector('.popup');

  editButton.addEventListener('click', () => {
    popUp.classList.toggle('popup_opened');
  })
})