import { togglePicModal } from '../utils/utils.js';
import { picModal, picModalCloseButton } from '../utils/constants.js';

export default class Card {
  constructor({data, templateSelector, handleCardClick}) {
    this._card = data;
    this._caption = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _toggleLikeButton() {
    this.classList.toggle('photo-elements__like-button_active');
  }

  _deleteCard() {
    this.closest('.photo-elements__item').remove();
  }

  // _openCard = () => {
  //   togglePicModal();
  //   picModal.querySelector('.pic-modal__image').src = this._imageLink;
  //   picModal.querySelector('.pic-modal__caption').textContent = this._caption;
  //   picModalCloseButton.addEventListener('click', togglePicModal);
  // }

  _setEventListeners = () => {
    this._card.querySelector('.photo-elements__like-button').addEventListener('click', this._toggleLikeButton);
    this._card.querySelector('.photo-elements__delete-button').addEventListener('click', this._deleteCard);
    this._card.querySelector('.photo-elements__image').addEventListener('click', () => {
      this._handleCardClick(this._caption, this._imageLink);
    });
  }
  
  createCard = () => {
    this._card = this._templateSelector.cloneNode(true);
    this._card.querySelector('.photo-elements__text').textContent = this._caption;
    this._card.querySelector('.photo-elements__image').src = this._imageLink;
    this._setEventListeners();

    return this._card;
  }
}