import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ modalSelector, formSubmitHandler }) {
    super(modalSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._modal.querySelector('.modal__form');
  }

  open() {
    this._modal.classList.add('modal_opened');
    super.open();
  }

  close() {
    this._modal.classList.remove('modal_opened');
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandler();
    })
  }
}