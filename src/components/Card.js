export default class Card {
  constructor(data, templateSelector, userid, { handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._data = data;
    this._caption = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userid = userid;
    this._isLiked = data.isLiked;
  }
  /**
   * getting card template
   */
  _getTemplate() {
    const cardElement =
    this
      ._templateSelector
      .querySelector('.photo-elements__item')
      .cloneNode(true);

    return cardElement;
  }
  /**
   * rendering likes
   */
  _renderLikes() {
    this._data.likes.some(elem => {
      if (elem._id == this._userid) {
        this._card.querySelector('.photo-elements__like-button').classList.add('photo-elements__like-button_active');
      }
    })
  }
  /**
   * creating a new card
   */
  createCard() {
    this._card = this._getTemplate();
    this._cardLikes = this._card.querySelector('.photo-elements__like-counter');
    this._card.querySelector('.photo-elements__text').textContent = this._caption;
    this._card.querySelector('.photo-elements__image').src = this._imageLink;
    this._setEventListeners();
    this._cardLikes.textContent = this._likes;
    this._renderLikes();

    if (!(this._userid === this._ownerId)) {
      this._card.querySelector('.photo-elements__delete-button').classList.add('photo-elements__delete-button_hidden');
    }

    return this._card;
  }
  /**
   * toggling like button state: liked/not liked
   */
  _toggleLikeButton() {
    this._card.querySelector('.photo-elements__like-button').classList.toggle('photo-elements__like-button_active');
  }
  /**
   * setting event listeners to card buttons
   */
  _setEventListeners() {
    this._card.querySelector('.photo-elements__like-button').addEventListener('click', () => {
      this._toggleLikeButton();
      this._handleLikeClick(this._isLiked);

      if (this._isLiked) {
        this._cardLikes.textContent = Number(this._cardLikes.textContent) - 1;
      } else {
        this._cardLikes.textContent = Number(this._cardLikes.textContent) + 1;
      }

      this._isLiked = !this._isLiked;
    });
    this._card.querySelector('.photo-elements__delete-button').addEventListener('click', () => {
      this._handleDeleteIconClick(this._id);
      this._card = null;
    });
    this._card.querySelector('.photo-elements__image').addEventListener('click', () => {
      this._handleCardClick(this._caption, this._imageLink);
    });
  }
}