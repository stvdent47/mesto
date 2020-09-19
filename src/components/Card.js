export default class Card {
  constructor(data, templateSelector, userid, { handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._caption = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userid = userid;
  }

  _getTemplate() {
    const cardElement =
    this
      ._templateSelector
      .querySelector('.photo-elements__item')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();
    // this._cardLikes = this._card.querySelector('.photo-elements__like-counter');
    this._card.querySelector('.photo-elements__text').textContent = this._caption;
    this._card.querySelector('.photo-elements__image').src = this._imageLink;
    this._setEventListeners();

    if (!(this._userid === this._ownerId)) {
      this._card.querySelector('.photo-elements__delete-button').classList.add('photo-elements__delete-button_hidden');
    }
    return this._card;
  }

  _toggleLikeButton() {
    this.classList.toggle('photo-elements__like-button_active');
    // this._handleLikeClick();
  }

  _deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._card.querySelector('.photo-elements__like-button').addEventListener('click', this._toggleLikeButton);
    this._card.querySelector('.photo-elements__delete-button').addEventListener('click', () => {
      this._handleDeleteIconClick(this._id);
      this._deleteCard();
    });
    this._card.querySelector('.photo-elements__image').addEventListener('click', () => {
      this._handleCardClick(this._caption, this._imageLink);
    });
  }
  

}