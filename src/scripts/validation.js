// // const showInputError = (formElement, inputElement, errorMessage) => {
// //   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
// //   inputElement.classList.add('popup__input_type_error');
// //   errorElement.textContent = errorMessage;
// //   errorElement.classList.add('popup__error_visible');
// // }

// const formList = Array.from(document.querySelectorAll('.popup__form'));

// // const setEventListeners

// // const hideInputError
// // const checkInputValidity
// // const changeButtonState

// const enableValidation = (object) => {
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });

//     const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//     const submitButton =  Array.from(formElement.querySelectorAll('.popup__button'));

//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', (evt) => {

//         const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

//         if (inputElement.validity.valid) {
//           inputElement.classList.remove('popup__input_type_error');
//           errorElement.textContent = '';
//           errorElement.classList.remove('popup__error_visible');
//         } else {
//           inputElement.classList.add('popup__input_type_error');
//           errorElement.textContent = inputElement.validationMessage;
//           errorElement.classList.add('popup__error_visible');
//         }
//       })
//     })
//   })
// }

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });



//validation for all the forms
const enableValidation = (settings) => {
  //reset default submit and validation behavior
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    // const submitButton = Array.from(formElement.querySelectorAll(settings.submitButtonSelector));

    inputList.forEach((inputElement) => {
      //input listeners for all the input fields
      inputElement.addEventListener('input', (evt) => {
        //find error of a field
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

        if (inputElement.validity.valid) {
          //add valid fields state
          inputElement.classList.remove(settings.inputErrorClass);
          errorElement.classList.remove(settings.errorClass);
          errorElement.textContent = '';
        } else {
          //add invalid fields state
          inputElement.classList.add(settings.inputErrorClass);
          errorElement.classList.add(settings.errorClass);
          errorElement.textContent = inputElement.validationMessage;
        }

        const isFormValid = inputList.some((inputElement) => !inputElement.validity.valid);
        //add button validation
        if (isFormValid) {
          submitButton.classList.add(settings.inactiveButtonClass);
          submitButton.disabled = true;
        } else {
          submitButton.classList.remove(settings.inactiveButtonClass);
          submitButton.disabled = false;
        }
      });
    });

    
  });
  
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});