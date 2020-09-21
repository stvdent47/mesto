import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  setEventListeners() {
    this._modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pic-modal_opened') || evt.target.classList.contains('pic-modal__close-button')) {
        this.close();
      }
    });
  }

  open(name, link) {
    this._modal.classList.add('pic-modal_opened');
    this._modal.querySelector('.pic-modal__caption').textContent = name;
    this._modal.querySelector('.pic-modal__image').alt = name;
    this._modal.querySelector('.pic-modal__image').src = link;
    super.open();
  }

  close() {
    this._modal.classList.remove('pic-modal_opened');
    super.close();
  }
}