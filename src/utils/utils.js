import Card from '../components/Card.js';

export const createNewCard = (data, cardElementTemplate, userId, modalWithImage, removeCardModal, api) => {
  const newCard = new Card(data, cardElementTemplate, userId,
  {
    handleCardClick: (name, link) => {
      modalWithImage.open(name, link);
    },
    handleLikeClick: (id) => {
      alert('card liked');
    },
    handleDeleteIconClick: () => {
      removeCardModal.open();
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