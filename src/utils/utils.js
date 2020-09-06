import Card from '../components/Card.js';

export const createNewCard = (modalWithImage, data, cardElementTemplate) => {
  const newCard = new Card({
    data: data,
    templateSelector: cardElementTemplate,
    handleCardClick: (name, link) => {
      modalWithImage.open(name, link);
    }
  }).createCard();

  return newCard;
}