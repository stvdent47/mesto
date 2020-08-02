const formList = Array.from(document.querySelectorAll('.popup__form'));


const enableValidation = (object) => {
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.target.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const submitButton =  Array.from(formElement.querySelectorAll('.popup__button'));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {

        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

        if (inputElement.validity.valid) {
          inputElement.classList.remove('popup__input_type_error');
          errorElement.textContent = '';
          errorElement.classList.remove('popup__error_visible');
        } else {
          inputElement.classList.add('popup__input_type_error');
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add('popup__error_visible');
        }
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});