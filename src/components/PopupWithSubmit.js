import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._form = this._modal.querySelector('.modal__form');
    this._deleteBtn = this._form.querySelector('.modal__button');
    this._saveBtnInitialText = this._deleteBtn.textContent;
  }

  open() {
    this._modal.classList.add('modal_opened');
    super.open();
  }

  close() {
    this._modal.classList.remove('modal_opened');
    super.close();
  }

  setSubmitAction(submitAction) {
    this._formSubmitHandler = submitAction;
  }

  setBtnLoadingState(state) {
    if (state) {
      this._deleteBtn.textContent = 'Удаление...';
    } else {
      this._deleteBtn.textContent = this._saveBtnInitialText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandler();
    })
  }
}