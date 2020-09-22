import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ modalSelector, formSubmitHandler, modalOpenHandler }) {
    super(modalSelector);
    this._formSubmitHandler =  formSubmitHandler;
    this._modalOpenHandler = modalOpenHandler;
    this._form = this._modal.querySelector('.modal__form');
    this._inputList = Array.from(this._modal.querySelectorAll('.modal__input'));
    this._saveBtn = this._form.querySelector('.modal__button');
    this._saveBtnInitialText = this._saveBtn.textContent;
  }
  /**
   * getting values of all inputs
   */
  _getInputValues() {
    const formInputValues = {};
    this._inputList.forEach((inputElement) => {
      formInputValues[inputElement.name] = inputElement.value;
    });
    return formInputValues;
  }
  /**
   * opening a modal with a form modal opening handler
   */
  open() {
    this._modal.classList.add('modal_opened');
    this._modalOpenHandler();
    super.open();
  }
  /**
   * closing a modal & reseting a form
   */
  close() {
    this._modal.classList.remove('modal_opened');
    super.close();
    this._form.reset();
  }
  /**
   * setting a save button text content depending on loading status
   */
  setBtnLoadingState(state) {
    if (state) {
      this._saveBtn.textContent = 'Сохранение...';
    } else {
      this._saveBtn.textContent = this._saveBtnInitialText;
    }
  }
  /**
   * closing a modal by clicking on overlay or close button and adding event listener to submit
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formInputValues = this._getInputValues();
      this._formSubmitHandler(formInputValues);
    });
  }
}