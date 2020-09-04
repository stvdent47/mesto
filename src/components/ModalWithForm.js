import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, formSubmitHandler, modalOpenHandler }) {
    super(modalSelector);
    this._formSubmitHandler =  formSubmitHandler;
    this._modalOpenHandler = modalOpenHandler;
    this._form = this._modal.querySelector('.modal__form');
    this._inputList = Array.from(this._modal.querySelectorAll('.modal__input'));
  }
//getting values of all inputs
  _getInputValues() {
    const formInputValues = {};
    this._inputList.forEach((inputElement) => {
      formInputValues[inputElement.name] = inputElement.value;
    });
    return formInputValues;
  }
//opening a modal with a form modal opening handler
  open() {
    this._modalOpenHandler();
    super.open();
  }
//closing a modal & reseting a form
  close() {
    super.close()
    this._form.reset();
  }
//closing a modal by clicking on overlay or close button and adding event listener to submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formInputValues = this._getInputValues();
      this._formSubmitHandler(formInputValues);
    });
  }
}