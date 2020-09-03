import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, formSubmitHandler, modalOpenHandler }) {
    super(modalSelector);
    this._formSubmitHandler =  formSubmitHandler;
    this._modalOpenHandler = modalOpenHandler;
    this._form = this._modal.querySelector('.modal__form');
    this._inputList = Array.from(this._modal.querySelectorAll('.modal__input'));
  }

  _getInputValues = () => {
    const formInputValues = {};
    this._inputList.forEach((inputElement) => {
      formInputValues[inputElement.name] = inputElement.value;
    });
    return formInputValues;
  }

  close = () => {
    this._modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }

  open = () => {
    this._modalOpenHandler();
    this._modal.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose);
    console.log('modal worked');
  }

  setEventListeners = () => {
    // super.setEventListeners();
    this._modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal_opened') || evt.target.classList.contains('modal__close-button')) {
        this.close();
      }
    });
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formInputValues = this._getInputValues();
      console.log(formInputValues);
      this._formSubmitHandler(formInputValues);
    })
  }
}