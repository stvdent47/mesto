//index.js constants
//main elements
export const editModal = document.querySelector('.edit-modal');
export const addModal = document.querySelector('.add-modal');
export const editModalForm = editModal.querySelector('.modal__form');
export const addModalForm = addModal.querySelector('.modal__form');
export const cardElementsList = document.querySelector('.photo-elements__list');
export const cardElementTemplate = document.querySelector('#photo-elements-template').content;
//buttons
export const openEditModalButton = document.querySelector('.profile__edit-button');
export const editModalSaveButton = editModal.querySelector('.modal__button');
export const editModalCloseButton = editModal.querySelector('.modal__close-button');
export const openaddModalButton = document.querySelector('.profile__add-button');
export const addModalSaveButton = addModal.querySelector('.modal__button');
export const addModalCloseButton = addModal.querySelector('.modal__close-button');
//fields
//edit-form
export const nameField = document.querySelector('.profile__name');
export const jobField = document.querySelector('.profile__description');
export const nameInput = editModal.querySelector('#profile-name-input');
export const jobInput = editModal.querySelector('#profile-job-input');
//add-card-form
export const addCardInputName = addModal.querySelector('#place-name-input');
export const addCardInputLink = addModal.querySelector('#place-link-input');
export const addCardInputNameError = addModal.querySelector('#place-name-error');
export const addCardInputLinkError = addModal.querySelector('#place-link-error');


//card class constants
export const picModal = document.querySelector('.pic-modal');
export const picModalCloseButton = picModal.querySelector('.pic-modal__close-button');