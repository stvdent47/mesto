// //showing an error message if an input is invalid
// const showInputError = (formElement, inputElement, errorMessage, settings) => {
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   inputElement.classList.add(settings.inputErrorClass);
//   errorElement.classList.add(settings.errorClass);
//   errorElement.textContent = errorMessage;
// }
// //hiding error messages if all inputs are valid
// const hideInputError = (formElement, inputElement, settings) => {
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   inputElement.classList.remove(settings.inputErrorClass);
//   errorElement.classList.remove(settings.errorClass);
//   errorElement.textContent = '';
// }
// //checking whether all inputs are valid or not
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }
// //toggling save button state depending on inputs state
// const toggleButtonState = (inputList, buttonElement, settings) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }
// //showing or hiding input error
// const checkInputValidity = (formElement, inputElement, settings) => {
//   if (inputElement.validity.valid) {
//     hideInputError(formElement, inputElement, settings);
//   } else {
//     showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//   }
// }
// //setting eventlisteners on every input
// const setEventListeners = (formElement, settings) => {
//   const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//   const submitButton = formElement.querySelector(settings.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', (evt) => {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, submitButton, settings);
//     });
//   });
// }
// //validation for all the forms
// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, settings);
//   });
// }

// enableValidation({
//   formSelector: '.modal__form',
//   inputSelector: '.modal__input',
//   submitButtonSelector: '.modal__button',
//   inactiveButtonClass: 'modal__button_disabled',
//   inputErrorClass: 'modal__input_type_error',
//   errorClass: 'modal__input-error-message_visible'
// });