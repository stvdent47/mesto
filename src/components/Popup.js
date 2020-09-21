export default class Popup {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }
/**
 * closing a modal by pressing escape key
 */
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
/**
 * opening a modal, this method is extended by child classes, as the html classes for modals are different
 */
  open() {
    document.addEventListener('keydown', this._handleEscClose);
  }
/**
 * closing a modal
 */
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
/**
 * closing a modal by clicking on overlay or close button
 */
  setEventListeners() {
    this._modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal_opened') || evt.target.classList.contains('modal__close-button')) {
        this.close();
      }
    });
  }
}