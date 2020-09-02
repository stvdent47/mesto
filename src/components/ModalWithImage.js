import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  setEventListeners = () => {
    this._modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pic-modal_opened') || evt.target.classList.contains('pic-modal__close-button')) {
        this.close();
      }
    });
  }

  close = () => {
    this._modal.classList.remove('pic-modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open = (name, link) => {
    this._modal.classList.add('pic-modal_opened');
    this._modal.querySelector('.pic-modal__image').src = link;
    this._modal.querySelector('.pic-modal__caption').textContent = name;
    // this._modal.querySelector('.pic-modal__caption').textContent = evt.target.closest('.photo-elements__item').querySelector('.photo-elements__text').textContent;
    document.addEventListener('keydown', this._handleEscClose);
    console.log('modal with img worked');
  }
}