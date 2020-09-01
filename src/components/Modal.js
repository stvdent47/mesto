export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners = () => {
    this._modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal_opened') || evt.target.classList.contains('modal__close-button')) {
        this.close();
      }
    });
  }

  open = () => {
    this._modal.classList.add('modal_opened');
    console.log('modal worked');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}