import Card from '../components/Card.js';

export const createNewCard = (data, cardElementTemplate, userId, modalWithImage, removeCardModal, api) => {
  data.isLiked = data.likes.some(elem => {
    return elem._id == userId;
  });

  const newCard = new Card(data, cardElementTemplate, userId,
  {
    /**
     * what to do when card image is clicked
     */
    handleCardClick: (name, link) => {
      modalWithImage.open(name, link);
    },
    /**
     * what to do when card like button is clicked
     */
    handleLikeClick: (isLiked) => {
      if (!isLiked) {
        api.addLike(data._id)
          .catch(err => alert(err));
      } else {
        api.removeLike(data._id)
          .catch(err => alert(err));
      }
    },
    /**
     * what to do when delete icon is clicked
     */
    handleDeleteIconClick: () => {
      removeCardModal.open();
      /**
       * what to do when a card removing is submitted in a modal 
       */
      removeCardModal.setSubmitAction(() => {
        api.removeCard(data._id)
          .then(() => {
            removeCardModal.setBtnLoadingState(true);
            removeCardModal.close();
            newCard.remove();
            removeCardModal.setBtnLoadingState(false);
          })
          .catch(err => alert(err));
      });
    }
  }).createCard();

  return newCard;
}